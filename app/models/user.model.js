module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        first_name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        contact: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        gender_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        nation_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_status_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        institution_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return User;
};