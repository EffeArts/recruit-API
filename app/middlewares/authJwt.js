const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../config/db.config");
const User = db.user;

// Function to verify the token
verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: "No Token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

// Function to check if it's an Admin 

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRole().then(role => {
            if (role.name == 102) {
                next();
                return;
            }

            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

isSuperAdmin = () => {
    User.findByPk(req.userId).then(user => {
        user.getRole().then(role => {
            if (role.code == 101) {
                next();
                return;
            }

            res.status(403).send({
                message: "Require Super Admin Role!"
            });
            return;
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isSuperAdmin: isSuperAdmin
};

module.exports = authJwt;