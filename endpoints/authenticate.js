const jwt = require("jsonwebtoken");
const express = require("express");
const crypto = require("crypto");
const User = require("../models/user");


const server = express.Router();


server.post("/", async (req, res) => {
    const { email, password, secretKey } = req.body;
    console.log("user", req.body)
    try {

        const user = await User.findOne({ where: { email } });

        if (!user || !(await comparePasswords(password, user.password))) {
            return res.status(401).send({ ok: false, error: "Invalid email or password." });
        }


        if (user.roles.includes('admin')) {
            const userSecretKey = user.secretKey;
            if (!userSecretKey || userSecretKey !== secretKey) {
                return res.status(401).send({ ok: false, error: "Invalid secret key." });
            }
        }


        const tokenPayload = { email: user.email, roles: user.roles };
        const token = jwt.sign(tokenPayload, "jwtPrivateKey", { expiresIn: "60m" });

        res.send({ ok: true, token });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ ok: false, error: "Internal server error." });
    }
});


server.use((req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return next();
    try {
        const decoded = jwt.verify(token, "jwtPrivateKey");
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            const newToken = jwt.sign(req.user, "jwtPrivateKey", { expiresIn: "60m" });
            res.setHeader("x-auth-token", newToken);
            next();
        } else {
            console.error("JWT Error:", error);
            res.status(401).send({ ok: false, error: "Token error." });
        }
    }
});

const comparePasswords = async (password, hash) => {
    const hashedPassword = await crypto.createHash('sha256').update(password).digest('hex');
    return hashedPassword === hash;
}

module.exports = server;
