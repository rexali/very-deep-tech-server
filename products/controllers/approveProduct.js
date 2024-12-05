const { Product } = require("../models/product.model");
/**
 * Update product
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const approveProduct = async (req, res) => {
    try {
        // retrieve the request body data
        const {
            productId,
        } = req.body;
        const approved = req.body.approved ?? 'no';

        const product = await Product.updateOne(
            { _id: productId },
            {
                approved
            });
        if (product.modifiedCount) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { product },
                message: "Approval success"
            })
        } else {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: { product },
                message: "Approval success"
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
    approveProduct
}