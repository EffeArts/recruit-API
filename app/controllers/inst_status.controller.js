const db = require("../models");

const Inst_status = db.inst_statuses;
const Op = db.sequelize.Op;

// Create and Save a new status
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.name) {
        res.status(400).send({
            message: "name or code can not be empty!"
        });
        return;
    }

    // Create an Institution status
    const inst_status = {
        code: req.body.code,
        name: req.body.name,
    };

    // Then save it in the Database
    Inst_status.create(inst_status).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the institution status."
            });
        });

};

// Retrieve all statuses from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? {
        name: {
            [Op.like]: `%${name}%`
        }
    } : null;

    // req.query.name is used to get the query string from the request and consider it as condition

    Inst_status.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Institution statuses."
            });
        });

};

// Find a single status with an :id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Inst_status.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Institution status with id=" + id
            });
        });

};

// Update a Inst_status by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Inst_status.update(req.body, {
        where: { id: id }
    })

    .then(num => {
            if (num == 1) {
                res.send({
                    message: "Institute status was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Institution status with id=${id}. Maybe The Institution status was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Institution status with id = " + id
            });
        });
};

// Delete an Inst_status with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Inst_status.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Institution status was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Institution staus with id=${id}. Maybe The Institution status was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Institution status with id = " + id
            });
        });
};

// Delete all Inst_types from the database.
exports.deleteAll = (req, res) => {
    Inst_status.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Institution statuses were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all the institution statuses."
            });
        });
};