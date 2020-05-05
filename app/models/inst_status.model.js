module.exports = (sequelize, Sequelize) => {
    const Inst_status = sequelize.define("inst_status", {
        code: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING(45),
            allowNull: false
        }
    });

    return Inst_status;
};