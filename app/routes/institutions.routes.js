module.exports = app => {
    const institutions = require("../controllers/institution.controller");

    let router = require("express").Router();

    // Create a new institution
    router.post("/", institutions.create);

    // Retrieve all institutions
    router.get("/", institutions.findAll);

    // Retrieve a single institution by id
    router.get("/:id", institutions.findOne);

    //Update a institution by id
    router.put("/:id", institutions.update);

    //Delete an institution by id
    router.delete("/:id", institutions.delete);

    //Delete all institutions
    router.delete("/", institutions.deleteAll);

    app.use('/api/v1/institutions/', router);
};