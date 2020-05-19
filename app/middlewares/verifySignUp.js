const db = require("../models");
const Role = db.user_roles;
const User = db.users;

const roles = Role.findAll({
    attributes: ['id']
});

checkDuplicateUsernameOrEmail = (req, res, next) => {
    //Username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "SignUp failed! Username is already in use!"
            });
            return;
        }

        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "SignUp failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
};

// checkRoleExist = (req, res, next) => {
//     if (req.body.role) {
//         if (!roles.includes(req.body.role)) {
//             res.status(400).send({
//                 message: "SignUp Failed! Role does not exist = " + req.body.role
//             });
//             return;
//         }
//     }

//     next();
// };

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
        // checkRoleExist: checkRoleExist
};

module.exports = verifySignUp;