const db = require("../models");

const Institution = db.institutions;
const Op = db.sequelize.Op;

// Create and Save a new Institution
exports.create = (req, res) => {
    // Validate request
    if (!req.body.code || !req.body.name || !req.body.address || !req.body.contact || !req.body.type || !req.body.email) {
        res.status(400).send({
            message: "some fields can not be empty!"
        });
        return;
    }

    // Create an Institution
    const status = 6;
    const institution = {
        code: req.body.code,
        name: req.body.name,
        address: req.body.address,
        country: req.body.country,
        city: req.body.city,
        contact: req.body.contact,
        email: req.body.email,
        inst_type_id: req.body.type,
        inst_status_id: status
    };

    // Then save it in the Database
    Institution.create(institution).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the institution."
            });
        });

};

// Retrieve all Institutions from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? {
        name: {
            [Op.like]: `%${name}%`
        }
    } : null;

    // req.query.name is used to get the query string from the request and consider it as condition

    Institution.findAll({
            include: [{
                    model: db.inst_statuses,
                    as: 'status',
                    attributes: ['id', 'name']
                },
                {
                    model: db.inst_types,
                    as: 'type',
                    attributes: ['id', 'name']
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt', 'inst_type_id', 'inst_status_id'] }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving institutions."
            });
        });

};

// Find a single Institution with an :id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Institution.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Institution with id=" + id
            });
        });

};

// Update an Institution by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Institution.update(req.body, {
        where: { id: id }
    })

    .then(num => {
            if (num == 1) {
                res.send({
                    message: "Institution was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Institution with id=${id}. Maybe The Institution was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Institution with id = " + id
            });
        });
};

// Delete an Institution with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Institution.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Institution was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Institution with id=${id}. Maybe The Institution was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Institution with id = " + id
            });
        });
};

// Delete all Institutions from the database.
exports.deleteAll = (req, res) => {
    Institution.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Institutions were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all the institutions."
            });
        });
};