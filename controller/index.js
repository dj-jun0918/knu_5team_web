const productController = require("./product.controller");
const userController = require("./user.controller");
const orderController = require("./order.controller");
const apiController = require("express").Router();

apiController.use("/user", userController);
apiController.use("/product", productController);
apiController.use("/order", orderController);

module.exports = apiController;
