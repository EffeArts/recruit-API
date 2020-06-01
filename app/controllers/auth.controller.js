const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Role = db.user_roles;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        contact: req.body.contact,
        username: req.body.username,
        role_id: req.body.role,
        user_status_id: 1,
        institution_id: req.body.institution,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(() => {
        res.send({ message: "User was registered successfully!" })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24hours
        });

        // const authority;

        user.getRole().then(role => {

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role_id,
                accessToken: token
            });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};