const { Product } = require("../models/product.model");

/** 
 * Get all products
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const searchProducts = async (req, res) => {
    try {
        const term = req.query?.term ?? "";
        const page = parseInt(req.querypage ?? 1);
        const limit = 10;
        const skip = (page - 1) * limit;
        const re = new RegExp(term, 'i');

        const products = await Product.find({ product_name: re })
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .exec();

        if (products.length) {
            // send success data
            res.status(200).json({
                status: "success",
                data: { products },
                message: "Product read",
            });
        } else {
            // send success data
            res.status(400).json({
                status: "success",
                data: { products },
                message: "Product read",
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
    searchProducts
}