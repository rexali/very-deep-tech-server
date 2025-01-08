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
const { getFilteredProducts } = require("../controllers/getFilteredProducts");
const { getSortedProducts } = require("../controllers/getSortedProducts");
const { removeProductPicture } = require("../controllers/removeProductPicture");

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
    '/pages/:page/users/:userId/subdomains/:subdomain',
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
    '/:page/initial/subdomains/:subdomain',
    // isAuthenticated,
    getInitialProductsData
);


// get all filtered products
productRouter.get(
    '/:page/filters/subdomains/:subdomain',
    // isAuthenticated,
    getFilteredProducts
);

// get all filtered products
productRouter.get(
    '/:page/sorts/subdomains/:subdomain',
    // isAuthenticated,
    getSortedProducts
);

// get all products categories
productRouter.get(
    '/:page/categories/subdomains/:subdomain',
    // isAuthenticated,
    getProductCategories
);

// get all approved products
productRouter.get(
    '/:page/approved/subdomains/:subdomain',
    // isAuthenticated,
    getApprovedProducts
);

// get all featured products
productRouter.get(
    '/:page/featured/subdomains/:subdomain',
    // isAuthenticated,
    getFeaturedProducts
);

// get all popular products
productRouter.get(
    '/:page/popular/subdomains/:subdomain',
    // isAuthenticated,
    getPopularProducts
);
// get all recommended products
productRouter.get(
    '/:page/recommended/subdomains/:subdomain',
    // isAuthenticated,
    getRecommendedProducts
);
// update a product
productRouter.patch(
    "/",
    // isAuthenticated,
    updateProduct
);
// remove a product picture
productRouter.patch(
    "/removeproductpicture",
    // isAuthenticated,
    removeProductPicture
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