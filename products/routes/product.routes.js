const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { getProduct } = require("../controllers/getProduct");
const { getProducts } = require("../controllers/getProducts");
const { updateProduct } = require("../controllers/updateProduct");
const { deleteProduct } = require("../controllers/deleteProduct");
const { createProduct } = require("../controllers/createProduct");
const { isAdmin } = require("../../auth/controllers/isAdmin");
const { getUserProducts } = require("../controllers/getUserProducts");
const { getFeaturedProducts } = require("../controllers/getFeaturedProducts");
const { getPopularProducts } = require("../controllers/getPopularProducts");
const { getRecommendedProducts } = require("../controllers/getRecommendedProducts");
const { getProductCategories } = require("../controllers/getProductCategories");

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
// get all products categories
productRouter.get(
    '/categories',
    // isAuthenticated,
    getProductCategories
);

// get all faetured products
productRouter.get(
    '/featured',
    // isAuthenticated,
    getFeaturedProducts
);

// get all popular products
productRouter.get(
    '/popular',
    // isAuthenticated,
    getPopularProducts
);
// get all recommended products
productRouter.get(
    '/recommended',
    // isAuthenticated,
    getRecommendedProducts
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