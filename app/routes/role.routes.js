const roles = require("../controllers/role.controller");
const { authJwt } = require('../middlewares');

module.exports = app => {


    let router = require("express").Router();

    // Create a new role
    router.post("/", roles.create);

    // Retrieve all roles
    router.get("/", roles.findAll);

    // Retrieve a role type by id
    router.get("/:id", roles.findOne);

    //Update a role by id
    router.put("/:id", roles.update);

    //Delete a role by id
    router.delete("/:id", roles.delete);

    //Delete all roles
    router.delete("/", roles.deleteAll);

    app.use('/api/v1/roles/', [authJwt.verifyToken], router);
};