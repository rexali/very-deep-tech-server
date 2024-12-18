const { Product } = require("../models/product.model");
var fs = require('fs/promises');

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
        // remove file
        const result = await fs.unlink(process.cwd(), 'public/uploads/' + product_picture);
        // find the product
        const product = await Product.findById(productId);
        // remove the picture string
        let productPictures = product.product_pictures.filter(picture => picture != product_picture);
        // update with the rest
        product.product_pictures = productPictures;
        // save
        await product.save();
        // send data as json
        res.status(200).json({
            status: "success",
            data: { product },
            message: "Removed!"
        })

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