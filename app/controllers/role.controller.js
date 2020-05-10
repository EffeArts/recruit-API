const db = require("../models");

const Role = db.user_roles;
const Op = db.sequelize.Op;

// Create and Save a new Role
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.code) {
        res.status(400).send({
            message: "name or code can not be empty!"
        });
        return;
    }

    // Create a Role
    const role = {
        code: req.body.code,
        name: req.body.name,
    };

    // Then save it in the Database
    Role.create(role).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the user role."
            });
        });

};

// Retrieve all Roles
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? {
        name: {
            [Op.like]: `%${name}%`
        }
    } : null;

    // req.query.name is used to get the query string from the request and consider it as condition

    Role.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user roles."
            });
        });

};

// Find a single Role with an :id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Role.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Role with id=" + id
            });
        });

};

// Update a Role by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Role.update(req.body, {
        where: { id: id }
    })

    .then(num => {
            if (num == 1) {
                res.send({
                    message: "Role was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Role with id=${id}. Maybe The Role was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Role with id = " + id
            });
        });
};

// Delete a Role with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Role.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Role was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Role with id=${id}. Maybe The Role was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Role with id = " + id
            });
        });
};

// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
    Role.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Roles were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all the Roles."
            });
        });
};