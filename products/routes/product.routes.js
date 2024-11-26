const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { getProduct } = require("../controllers/getProduct");
const { getProducts } = require("../controllers/getProducts");
const { updateProduct } = require("../controllers/updateProduct");
const { deleteProduct } = require("../controllers/deleteProduct");
const { createProduct } = require("../controllers/createProduct");
const { isAdmin } = require("../../auth/controllers/isAdmin");
const { getUserProducts } = require("../controllers/getUserProducts");

// initialize product router
const productRouter = express.Router();
// get a product
productRouter.post(
    '/',
    // isAdmin,
    createProduct
);
// get a product
productRouter.get(
    '/:id',
    // isAuthenticated, 
    getProduct
);
// get user products
productRouter.get(
    '/:id/users',
    // isAuthenticated, 
    getUserProducts
);
// get all products
productRouter.get(
    '/',
    // isAuthenticated,
    getProducts
);
// update a product
productRouter.patch(
    "/",
    // isAuthenticated,
    updateProduct
);
// delete a product
productRouter.delete(
    "/",
    // isAdmin,
    deleteProduct
);
// export product router
module.exports = {
    productRouter
}