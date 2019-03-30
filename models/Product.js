module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define('product', {
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
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    Product.associate = function (db) {
        // models.Product.belongsTo(models.store, { foreignKey: "store_id", targetKey: "id" });
        db.Product.belongsTo(db.Store);
        db.Product.belongsTo(db.User);
    }

    return Product;
}