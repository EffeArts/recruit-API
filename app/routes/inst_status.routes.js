module.exports = app => {
    const inst_statuses = require("../controllers/inst_status.controller");

    let router = require("express").Router();

    // Create a new status
    router.post("/", inst_statuses.create);

    // Retrieve all statuses
    router.get("/", inst_statuses.findAll);

    // Retrieve a single status by id
    router.get("/:id", inst_statuses.findOne);

    //Update a status by id
    router.put("/:id", inst_statuses.update);

    //Delete a status by id
    router.delete("/:id", inst_statuses.delete);

    //Delete all statuses
    router.delete("/", inst_statuses.deleteAll);

    app.use('/api/v1/inst_statuses/', router);
};