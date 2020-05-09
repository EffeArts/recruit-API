module.exports = (sequelize, DataTypes) => {
    const Inst_type = sequelize.define("inst_type", {
        code: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    });

    return Inst_type;
};