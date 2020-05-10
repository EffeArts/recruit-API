const db = require("../models");

const Status = db.user_statuses;
const Op = db.sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.code) {
        res.status(400).send({
            message: "name or code can not be empty!"
        });
        return;
    }


    const status = {
        code: req.body.code,
        name: req.body.name,
    };

    // Then save it in the Database
    Status.create(status).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the user status."
            });
        });

};

// Retrieve all Statuses
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? {
        name: {
            [Op.like]: `%${name}%`
        }
    } : null;

    // req.query.name is used to get the query string from the request and consider it as condition

    Status.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user statuses."
            });
        });

};

// Find a single Status with an :id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Status.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Status with id=" + id
            });
        });

};

// Update a Status by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Status.update(req.body, {
        where: { id: id }
    })

    .then(num => {
            if (num == 1) {
                res.send({
                    message: "Status was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Status with id=${id}. Maybe The Status was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Status with id = " + id
            });
        });
};

// Delete a Status with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Status.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Status was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Status with id=${id}. Maybe The Status was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Status with id = " + id
            });
        });
};

// Delete all Status from the database.
exports.deleteAll = (req, res) => {
    Status.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Statuses were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all the Statuses."
            });
        });
};