const { authJwt } = require('../middlewares');
const users = require("../controllers/user.controller");

module.exports = app => {

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    let router = require("express").Router();

    // Retrieve all users
    router.get("/", users.findAll);

    // Retrieve a single user by id
    router.get("/:id", users.findOne);

    //Update a institution by id
    router.put("/:id", users.update);

    //Check userID from the request
    router.get("/userId", (res, req) => {
        res.json({ userId: req.userId });
    });

    app.use('/api/v1/users/', router);
};