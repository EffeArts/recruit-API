const { authJwt } = require('../middlewares');
const institutions = require("../controllers/institution.controller");

module.exports = app => {

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

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

    //Check userID from the request
    router.get("/userId", (res, req) => {
        res.json({ userId: req.userId });
    });

    app.use('/api/v1/institutions/', [authJwt.verifyToken], router);
};