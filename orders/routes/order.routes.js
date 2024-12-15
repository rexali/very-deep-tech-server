const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { createOrder } = require("../controllers/createOrder");
const { getOrders } = require("../controllers/getOrders");
const { getUserOrders } = require("../controllers/getUserOrders");
const { getOrder } = require("../controllers/getOrder");
const { updateOrder } = require("../controllers/updateOrder");

// initialize order router
const orderRouter = express.Router();

// create order
orderRouter.post(
    '/',
    // isAuthenticated,
    createOrder
);
// update order
orderRouter.patch(
    '/',
    // isAuthenticated,
    updateOrder
);
// get all orders and products
orderRouter.get(
    '/',
    // isAuthenticated, 
    getOrders
);

// get one order and product
orderRouter.get(
    '/:id',
    // isAuthenticated,
    getOrder
);

// get user orders and products
orderRouter.get(
    '/:page/users/:id',
    // isAuthenticated,
    getUserOrders
);

// export order router
module.exports = {
    orderRouter
}