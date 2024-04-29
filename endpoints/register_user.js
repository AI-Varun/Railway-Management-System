const express = require("express");
const crypto = require("crypto");
const User = require("../models/user");
const server = express.Router();

server.post("/", async (req, res) => {

    const { email, password, roles, secretKey } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({
            ok: false,
            error: "User already exists."
        });
    }


    if (roles.includes('admin')) {

        if (!secretKey) {
            return res.status(400).json({
                ok: false,
                error: "Admin user requires a secret key."
            });
        }
    } else {

        if (secretKey) {
            return res.status(400).json({
                ok: false,
                error: "Secret key is only required for admin users."
            });
        }
    }


    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');


    const newUser = await User.create({
        email,
        password: hashedPassword,
        roles,
        secretKey: roles.includes('admin') ? secretKey : null
    });


    res.status(201).json({
        ok: true,
        message: "User registered successfully."
    });
});

module.exports = server;
