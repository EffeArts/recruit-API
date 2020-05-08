const Status = require('./inst_status.model');

module.exports = (sequelize, DataTypes) => {
    const Institution = sequelize.define("institution", {
        code: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(100)
        },
        city: {
            type: DataTypes.STRING(100)
        },
        contact: {
            type: DataTypes.STRING(45)
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        inst_status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Status,
                key: 'id'
            }

        },
        inst_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Institution;
};