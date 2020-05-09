module.exports = (sequelize, DataTypes) => {
    const Inst_status = sequelize.define("inst_status", {
        code: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    });

    return Inst_status;
};