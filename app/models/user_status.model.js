module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define("user_status", {
        code: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    });

    return Status;
};