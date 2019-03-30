var express = require("express");
var router = express.Router();
var fs = require("fs");
var md5 = require("md5");
var path = require("path");
var express = require("express");
const Sequelize = require("sequelize");
var isEmail = require("sane-email-validation");
import models from '../models/index';

/* ===========================================Header Complete============================================== */


/* GET home page. */
router.get("/", async function (req, res, next) {
    await models.User.create({
        username: "NewDon",
        email: "my@gamil.com",
        first_name: "Rocky",
        last_name: "KGF",
        password: "12345678",
        salt: "12131"
    }).then(user => {
        // console.log(user)
        return models.Product.create({
            name: "NewPro",
            price: "121212"
        }).then(product => {
            // console.log(product)
            return models.Store.create({
                name: "Saravana",
                slog: "New Store"
            }).then(store => {
                // console.log(store)
                return user.addProduct(product).then(() => {
                    return store.addProduct(product).then(() => {
                        return user.addStore(store, {
                            through: {
                                role: 'manager'
                            }
                        }).then(() => {
                            return user.hasProduct(product).then((result) => {
                                // console.log("  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  ")
                                // console.log(result);
                                res.json(result)
                            })
                        })
                    })
                })
            })
        })
    })
});


router.get("/getall", async function (req, res, next) {
    var New = await models.User.findAll({
        include: [{
            model: models.Store,
            include: [{
                model: models.Product
            }]
        }, {
            model: models.Product
        }]
    })
    res.json(New);
});



module.exports = router;