const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { getCarts } = require("../controllers/getCarts");
const { deleteCart } = require("../controllers/deteteCart");
const { createCart } = require("../controllers/createCart");
const { getUserCarts } = require("../controllers/getUserCarts");
const { updateCart } = require("../controllers/updateCart");
const { clearUserCart } = require("../controllers/clearUserCarts");
const { getCart } = require("../controllers/getCart");
const { getUserCartx } = require("../controllers/getUserCartx");
const { deleteUserCart } = require("../controllers/deteteUserCart");

// initialize cart router
const cartRouter = express.Router();

// create a cart
cartRouter.post(
    '/',
    // isAuthenticated,
    createCart
);
// get all carts 
cartRouter.get( 
    '/',
    // isAuthenticated,
    getCarts
);

// get a cart
cartRouter.get( 
    '/:id',
    // isAuthenticated,
    getCart
);

// get a user carts with page
cartRouter.get( 
    '/users/:userId/pages/:page',
    // isAuthenticated,
    getUserCarts
);

// get a user carts without page
cartRouter.get( 
    '/users/:userId',
    // isAuthenticated,
    getUserCartx
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

// delete a user cart
cartRouter.delete(
    "/:id/users/:userId",
    // isAuthenticated,
    deleteUserCart
);

// clear a user carts
cartRouter.delete(
    "/users/:userId",
    // isAuthenticated,
    clearUserCart
);
// export cart router
module.exports = {
    cartRouter
}