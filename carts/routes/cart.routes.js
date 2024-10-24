const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { getCarts } = require("../controllers/getCarts");
const { deleteCart } = require("../controllers/deteteCart");
const { createCart } = require("../controllers/createCart");
const { getUserCarts } = require("../controllers/getUserCarts");
const { updateCart } = require("../controllers/updateCart");
const { clearUserCart } = require("../controllers/clearUserCarts");

// initialize cart router
const cartRouter = express.Router();

// get all carts and products
cartRouter.post(
    '/',
    // isAuthenticated,
    createCart
);
// get all carts and products
cartRouter.get( 
    '/',
    // isAuthenticated,
    getCarts
);

// get user carts and products
cartRouter.get( 
    '/:id',
    // isAuthenticated,
    getUserCarts
);

// update a cart
cartRouter.patch(
    "/",
    // isAuthenticated,
    updateCart
);
// delete a cart
cartRouter.delete(
    "/:id",
    // isAuthenticated,
    deleteCart
);

// delete a cart
cartRouter.delete(
    "/:id/users",
    // isAuthenticated,
    clearUserCart
);
// export cart router
module.exports = {
    cartRouter
}