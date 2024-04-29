const express = require("express");


const auth = require("../security_layer/verify_auth");
const { admin, editor, viewer } = require("../security_layer/user_roles");
const Train = require("../models/train");
const Booking = require("../models/booking_details");
const { acquireLock, releaseLock } = require("../utils/fileHandler");

const server = express.Router();



server.post("/add_train", [auth], async (req, res) => {
    try {

        if (!req.user.roles.includes("admin")) {
            return res.status(403).json({ ok: false, error: "Access denied." });
        }

        const { name, source, destination, stations, departureTime, totalSeats, bookedSeats } = req.body;


        const existingTrain = await Train.findOne({ where: { name } });
        if (existingTrain) {
            return res.status(400).json({ ok: false, error: "Train already exists." });
        }

        const newTrain = await Train.create({
            name,
            source,
            destination,
            stations,
            departureTime,
            totalSeats,
            bookedSeats
        });

        res.status(201).json({ ok: true, message: "Train added successfully.", train: newTrain });
    } catch (error) {
        console.error("Error adding train:", error);
        res.status(500).json({ ok: false, error: "Internal server error." });
    }
});

server.post("/fetch_train", [auth], async (req, res) => {
    const { source, destination } = req.body;

    try {
        const trains = await Train.findAll({
            where: {
                source,
                destination
            }
        });

        const trainsWithAvailability = trains.map(train => ({
            id: train.id,
            name: train.name,
            source: train.source,
            destination: train.destination,
            totalSeats: train.totalSeats,
            availability: train.totalSeats - train.bookedSeats
        }));

        res.status(200).json({ ok: true, trains: trainsWithAvailability });
    } catch (error) {
        console.error("Error fetching trains:", error);
        res.status(500).json({ ok: false, error: "Internal server error" });
    }
});

server.post("/book_seat", async (req, res) => {
    const { id, userId } = req.body;

    try {
        const lockKey = `train_${id}_lock`;

        const lockAcquired = await acquireLock(lockKey, 60);

        if (!lockAcquired) {
            return res.status(503).json({ ok: false, error: "Failed to acquire lock" });
        }

        const train = await Train.findByPk(id);

        if (!train) {
            return res.status(404).json({ ok: false, error: "Train not found" });
        }

        if (train.bookedSeats >= train.totalSeats) {
            return res.status(400).json({ ok: false, error: "No available seats" });
        }

        const booking = await Booking.create({ userId, trainId: id });

        train.bookedSeats += 1;
        await train.save();

        const { id: excludedId, totalSeats, bookedSeats, ...trainDetails } = train.toJSON();

        await releaseLock(lockKey);

        res.status(200).json({ ok: true, message: "Seat booked successfully", booking, train: trainDetails });
    } catch (error) {
        console.error("Booking failed:", error);
        res.status(500).json({ ok: false, error: "Internal server error" });
    }
});


module.exports = server;