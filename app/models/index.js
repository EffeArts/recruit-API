const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.inst_types = require("./inst_type.model.js")(sequelize, Sequelize);
db.inst_statuses = require("./inst_status.model")(sequelize, Sequelize);
db.institutions = require("./institution.model")(sequelize, Sequelize);
db.user_roles = require("./user_role.model")(sequelize, Sequelize);
db.user_statuses = require("./user_status.model")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, Sequelize);

// ----------------------Sequelize associations----------------------------
// status and institutions relationship
db.inst_statuses.hasMany(db.institutions, {
    foreignKey: "inst_status_id",
    as: "institutions",
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
db.institutions.belongsTo(db.inst_statuses, {
    foreignKey: "inst_status_id",
    targetKey: 'id',
    as: "status",
});

// types and institutions relationship
db.inst_types.hasMany(db.institutions, {
    foreignKey: "inst_type_id",
    as: "institutions",
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
db.institutions.belongsTo(db.inst_types, {
    foreignKey: "inst_type_id",
    as: "type"
});

// Users and Role relationship
db.user_roles.hasMany(db.users, {
    foreignKey: "role_id",
    as: "users",
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
db.users.belongsTo(db.user_roles, {
    foreignKey: "role_id",
    as: "role"
});

// Users and statuses relationship
db.user_statuses.hasMany(db.users, {
    foreignKey: "user_status_id",
    as: "users",
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
db.users.belongsTo(db.user_statuses, {
    foreignKey: "user_status_id",
    as: "status"
});

// Users and institutions relationship
db.institutions.hasMany(db.users, {
    foreignKey: "institution_id",
    as: "users",
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
db.users.belongsTo(db.institutions, {
    foreignKey: "institution_id",
    as: "institution"
});

module.exports = db;