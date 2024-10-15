const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { getCarts } = require("../controllers/getCarts");
const { deleteCart } = require("../controllers/deteteCart");
const { createCart } = require("../controllers/createCart");

// initialize cart router
const cartRouter = express.Router();

// get all products
cartRouter.post(
    '/',
    isAuthenticated,
    createCart
);
// get all products
cartRouter.get( 
    '/',
    isAuthenticated,
    getCarts
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