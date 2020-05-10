module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("role", {
        code: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    });

    return Role;
};