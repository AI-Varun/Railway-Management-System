const admin = async (req, res, next) => {
    if (!req.user.roles.includes("admin")) return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

const user = async (req, res, next) => {
    if (!req.user.roles.includes("editor")) return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

const viewer = async (req, res, next) => {
    if (!req.user.roles.includes("viewer")) return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

module.exports = { admin, user, viewer };