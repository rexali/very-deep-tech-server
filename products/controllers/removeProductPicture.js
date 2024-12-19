const { Product } = require("../models/product.model");
var fs = require('fs/promises');
var path = require('path');

/**
 * Update product
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const removeProductPicture = async (req, res) => {

    // retrieve the request body data
    const {
        productId,
        product_picture
    } = req.body;
    try {
        // find the product
        const product = await Product.findById(productId);
        // remove the picture string
        let productPictures = product.product_pictures.filter(picture => picture != product_picture);
        // update with the rest
        product.product_pictures = productPictures;
        // save
        await product.save();

        if (product != null) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { product },
                message: "Removed!"
            })
        }
        if (product != null) {
            // remove file
            try {
                await fs.unlink(path.join(process.cwd(), 'public/uploads/' + product_picture));
            } catch (error) {
                console.log(error)
            }

            if (Object.keys(product).length) {
                res.status(200).json({
                    status: "success",
                    data: { product },
                    message: "Product found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { product: {} },
                    message: "No product found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { product: null },
                message: "No product found",
            });
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
    removeProductPicture
}