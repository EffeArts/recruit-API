module.exports = app => {
    const inst_types = require("../controllers/inst_type.controller");

    let router = require("express").Router();

    // Create a new type
    router.post("/", inst_types.create);

    // Retrieve all types
    router.get("/", inst_types.findAll);

    // Retrieve a single type by id
    router.get("/:id", inst_types.findOne);

    //Update a type by id
    router.put("/:id", inst_types.update);

    //Delete a type by id
    router.delete("/:id", inst_types.delete);

    //Delete all types
    router.delete("/", inst_types.deleteAll);

    app.use('/api/v1/inst_types/', router);
};