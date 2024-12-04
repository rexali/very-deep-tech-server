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
            .populate("user", ["_id", "email", "role"])
            .populate("ratings")
            .populate("likes")
            .exec();

        let preparedProduct = JSON.parse(JSON.stringify(product));
        const finalProduct = {
            ...preparedProduct,
            averageRating: preparedProduct.ratings.map(rating => Number(rating?.ratingScore ?? 0))
                .reduce((prev, curr) => prev + curr, 0) / preparedProduct.ratings.length
        }

        if (product != null) {
            if (Object.keys(product).length) {
                res.status(200).json({
                    status: "success",
                    data: { product: finalProduct },
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