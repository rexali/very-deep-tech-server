const { Product } = require("../models/product.model");
/**
 * Update product
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const updateProduct = async (req, res) => {
    try {
        // retrieve the request body data
        const {
            productId,
            product_name,
            product_category,
            product_sub_category,
            product_description,
            product_price,
            product_quantity,
            product_weight,
            product_size,
            product_code,
            product_demos_links,
            product_photos_links
        } = req.body;

        const product = await Product.updateOne(
            { _id: productId },
            {
                product_name,
                product_category,
                product_sub_category,
                product_description,
                product_price,
                product_quantity,
                product_weight,
                product_size,
                product_code,
                product_demos_links,
                product_photos_links
            });
        if (product.modifiedCount) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { product },
                message: "Product updated"
            })
        } else {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: { product },
                message: "Product update failed"
            })
        }


    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(200).json({
            status: "failed",
            data: null,
            message: "Error! " + error.message

        })
    }
};

module.exports = {
    updateProduct
}