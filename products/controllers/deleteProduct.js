const { Product } = require("../models/product.model");

/** 
 * Remove a product
 * @param {object} req - request object
 * @param {object} res - response object to user request
 */
const deleteProduct = async (req, res) => {
    try {
        // get a client id
        const _id = req.body.id;
        //    delete product
        const product = await Product.deleteOne({ _id });

        if (product.deletedCount) {
            // send success data
            res.status(200).json({
                status: "success",
                data: { product },
                message: "product deleted",
            });
        } else {
            // send success data
            res.status(400).json({
                status: "success",
                data: { product },
                message: "product deletion failed",
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
    deleteProduct 
}