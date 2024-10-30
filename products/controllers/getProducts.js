const { Product } = require("../models/product.model");

/** 
 * Get all products
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getProducts = async (req, res) => {

    try {
        const page = parseInt(req.query?.page ?? 1);
        const limit = 10;
        const skip = (page - 1) * limit;
        const products = await Product.find()
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate("ratings")
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
    getProducts
}