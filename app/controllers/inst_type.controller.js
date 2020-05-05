const db = require("../models");

const Inst_type = db.inst_types;
const Op = db.sequelize.Op;

// Create and Save a new Inst_type
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.name) {
        res.status(400).send({
            message: "name or code can not be empty!"
        });
        return;
    }

    // Create an Institution type
    const inst_type = {
        code: req.body.code,
        name: req.body.name,
    };

    // Then save it in the Database
    Inst_type.create(inst_type).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the institution type."
            });
        });

};

// Retrieve all Inst_types from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? {
        name: {
            [Op.like]: `%${name}%`
        }
    } : null;

    // req.query.title is used to get the query string from the request and consider it as condition

    Inst_type.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });

};

// Find a single Inst_type with an :id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Inst_type.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Institution type with id=" + id
            });
        });

};

// Update a Inst_type by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Inst_type.update(req.body, {
        where: { id: id }
    })

    .then(num => {
            if (num == 1) {
                res.send({
                    message: "Institute type was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Institution type with id=${id}. Maybe The Institution type was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Institution Type with id = " + id
            });
        });
};

// Delete a Inst_type with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Inst_type.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Institution type was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Institution type with id=${id}. Maybe The Institution type was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Institute with id = " + id
            });
        });
};

// Delete all Inst_types from the database.
exports.deleteAll = (req, res) => {
    Inst_type.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Institution types were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all the institution types."
            });
        });
};