const { Product } = require("../models/product.model");
const { getFeatured } = require("./getFeaturedProducts");
const { getPopular } = require("./getPopularProducts");
const { getProductData } = require("./getProducts");
const { getRecommended } = require("./getRecommendedProducts");

/** 
 * Get all products
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getInitialProductsData = async (req, res) => {

    Promise.all([getProductData(req, res), getPopular(req, res), getRecommended(req, res), getFeatured(req, res)]).then(([
        productData,
        popularData,
        recommendedData,
        featuredData
    ]) => {
        res.status(200).json({
            status: "success",
            data: {
                productData,
                popularData,
                recommendedData,
                featuredData
            },
            message: "Products found",
        });

    }).catch((error) => {
        // catch  the error
        console.warn(error);
        // send error response
        res.status(500).json({
            status: "failed",
            data: null,
            message: "Error! " + error.message
        })
    })
}

module.exports = {
    getInitialProductsData
}