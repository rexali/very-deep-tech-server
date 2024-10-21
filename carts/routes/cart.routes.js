const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { getCarts } = require("../controllers/getCarts");
const { deleteCart } = require("../controllers/deteteCart");
const { createCart } = require("../controllers/createCart");
const { getUserCarts } = require("../controllers/getUserCarts");

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

// delete a cart
cartRouter.delete(
    "/",
    isAuthenticated,
    deleteCart
);
// export cart router
module.exports = {
    cartRouter
}