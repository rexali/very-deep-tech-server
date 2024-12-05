const { Product } = require("../models/product.model");
/**
 * Update product
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const featureProduct = async (req, res) => {
    try {
        // retrieve the request body data
        const {
            productId,
        } = req.body;
        const featured = req.body.featured ?? 'no';

        const product = await Product.updateOne(
            { _id: productId },
            {
                featured,
            });
        if (product.modifiedCount) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { product },
                message: "Featured success"
            })
        } else {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: { product },
                message: "Featured failed"
            })
        }


    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(500).json({
            status: "failed",
            data: null,
            message: "Error! " + error.message

        })
    }
};

module.exports = {
    featureProduct
}