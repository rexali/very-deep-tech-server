const { Product } = require("../models/product.model");

/** 
 * Get all products
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getProductCategories = async (req, res) => {

    try {

        const products = await Product.find().select('product_category').exec();

        if (products != null) {
            if (products.length) {
                res.status(200).json({
                    status: "success",
                    data: { products: products.reverse() },
                    message: "Products found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { products: [] },
                    message: "No products found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { products: null },
                message: "No products found",
            });
        }

    } catch (error) {
        // catch  the error
        console.warn(error);
        // send error response
        res.status(500).json({
            status: "failed",
            data: null,
            message: "Error! " + error.message
        })
    }

}

async function getCategories(req, res) {
    const subdomain = req.query?.subdomain ?? "";

    if (subdomain) {
        return await Product.find({ subdomain }).select('product_category').exec();
    } else {
        return await Product.find().select('product_category').exec();
    }
}

module.exports = {
    getProductCategories,
    getCategories
}