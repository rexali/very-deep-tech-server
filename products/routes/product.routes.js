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
const { featureProduct } = require("../controllers/featureProduct");
const { approveProduct } = require("../controllers/approveProduct");
const { getApprovedProducts } = require("../controllers/getApprovedProducts");
const { getInitialProductsData } = require("../controllers/getInitalProductsData");

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

// get all initial homepage products data
productRouter.get(
    '/:page/initial',
    // isAuthenticated,
    getInitialProductsData
);

// get all products categories
productRouter.get(
    '/:page/categories',
    // isAuthenticated,
    getProductCategories
);

// get all approved products
productRouter.get(
    '/:page/approved',
    // isAuthenticated,
    getApprovedProducts
);

// get all featured products
productRouter.get(
    '/:page/featured',
    // isAuthenticated,
    getFeaturedProducts
);

// get all popular products
productRouter.get(
    '/:page/popular',
    // isAuthenticated,
    getPopularProducts
);
// get all recommended products
productRouter.get(
    '/:page/recommended',
    // isAuthenticated,
    getRecommendedProducts
);
// update a product
productRouter.patch(
    "/",
    // isAuthenticated,
    updateProduct
);
// featured a  product
productRouter.patch(
    "/featureproduct",
    // isAuthenticated,
    featureProduct
);
// approve a product
productRouter.patch(
    "/approveproduct",
    // isAuthenticated,
    approveProduct
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