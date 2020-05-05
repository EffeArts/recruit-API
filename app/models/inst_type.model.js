module.exports = (sequelize, Sequelize) => {
    const Inst_type = sequelize.define("inst_type", {
        code: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING(45),
            allowNull: false
        }
    });

    return Inst_type;
};