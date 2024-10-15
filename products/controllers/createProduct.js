const { Product } = require("../models/product.model");
/**
 * Create a product
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const createProduct = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            product_name,
            product_picture,
            product_category,
            product_sub_category,
            product_description,
            product_price, 
            product_quantity,
            product_weight,
            product_size,
            product_code,
            user_id
        } = req.body;

        const product = await Product.create({
            product_name,
            product_picture,
            product_category,
            product_sub_category,
            product_description,
            product_price,
            product_quantity,
            product_weight,
            product_size,
            product_code,
            user: { _id: user_id }
        });

        if (product !== null) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { product },
                message: "Product created"
            })

        } else {
            // send data as json
            res.status(400).json({
                status: "success",
                data: { product },
                message: "Product creation failed"
            })
        }

    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(500).json({
            status: "failed",
            data: result,
            message: "Error! " + error.message

        })
    }

};

module.exports = {
    createProduct
}