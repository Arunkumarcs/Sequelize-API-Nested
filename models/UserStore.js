module.exports = function (sequelize, DataTypes) {
    var UserStore = sequelize.define('userstore', {
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    UserStore.associate = function (db) {
        db.User.belongsToMany(db.Store, {
            through: db.UserStore
        });
        db.Store.belongsToMany(db.User, {
            through: db.UserStore
        });
    }

    return UserStore;
}