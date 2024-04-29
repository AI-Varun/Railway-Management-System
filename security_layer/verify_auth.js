const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) return res.status(401).send({
        ok: false,
        error: "Access denied. No token provided"
    });

    console.log("Token received for verification:", token);
    try {
        const decoded = jwt.verify(token, "jwtPrivateKey");
        console.log("Token decoded successfully:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).send({
            ok: false,
            error: "Invalid token"
        });
    }

}
