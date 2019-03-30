module.exports = function (sequelize, DataTypes) {
    var Store = sequelize.define('store', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        slog: {
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

    Store.associate = function (db) {
        // db.Store.hasMany(db.Product, {
        //     foreignKey: "store_id",
        //     sourceKey: "id"
        // });
        db.Store.hasMany(db.Product);
    }

    return Store;
}