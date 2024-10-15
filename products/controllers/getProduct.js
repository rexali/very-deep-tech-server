const { Product } = require("../models/product.model");

/** 
 * Get all products
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getProduct = async (req, res) => {
    try {
        const _id = req.params.id
        const product = await Product.findById(_id)
            .populate("user")
            .exec();

        if (Object.keys(product).length) {
            // send success data
            res.status(200).json({
                status: "success",
                data: { product },
                message: "Product read",
            });
        } else {
            // send success data
            res.status(400).json({
                status: "success",
                data: { product },
                message: "Product reading failed",
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
    getProduct
}