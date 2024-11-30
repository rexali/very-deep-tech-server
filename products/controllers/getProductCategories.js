const { Product } = require("../models/product.model");

/** 
 * Get all products
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getProductCategories = async (req, res) => {

    try {

        const products = await Product.find();

        const categories = JSON.parse(JSON.stringify(products)).map(product => product.product_category);

        if (products != null) {
            if (products.length) {
                res.status(200).json({
                    status: "success",
                    data: { products: categories },
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

module.exports = {
    getProductCategories
}