const { authJwt } = require('../middlewares');
const statuses = require("../controllers/user_status.controller");

module.exports = app => {

    let router = require("express").Router();

    router.post("/", statuses.create);

    router.get("/", statuses.findAll);

    router.get("/:id", statuses.findOne);

    router.put("/:id", statuses.update);

    router.delete("/:id", statuses.delete);

    router.delete("/", statuses.deleteAll);

    app.use('/api/v1/user_statuses/', [authJwt.verifyToken], router);
};