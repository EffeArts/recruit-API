const db = require("../models");

const User = db.users;
const Op = db.Sequelize.Op;

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const inst = req.query.inst;
    var condition = inst ? {
        institution_id: {
            [Op.eq]: inst
        }
    } : null;

    User.findAll({
            where: condition,
            include: [{
                    model: db.user_statuses,
                    as: 'status',
                    attributes: ['id', 'name']
                },
                {
                    model: db.user_roles,
                    as: 'role',
                    attributes: ['id', 'name']
                },
                {
                    model: db.institutions,
                    as: 'institution',
                    attributes: ['id', 'name']
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt', 'user_status_id', 'role_id', 'institution_id'] }
        })
        .then(data => {
            res.send({
                message: "users",
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });

};

// Find a single user with an :id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, {
            include: [{
                    model: db.user_statuses,
                    as: 'status',
                    attributes: ['id', 'name']
                },
                {
                    model: db.user_roles,
                    as: 'role',
                    attributes: ['id', 'name']
                },
                {
                    model: db.institutions,
                    as: 'institution',
                    attributes: ['id', 'name']
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt', 'user_status_id', 'role_id', 'institution_id'] }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });

};


// Update a user by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })

    .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe The User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id = " + id
            });
        });
};