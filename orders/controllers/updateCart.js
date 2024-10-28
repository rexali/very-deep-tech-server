const { Cart } = require("../models/cart.model");
/**
 * Update cart
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const updateCart = async (req, res) => {
    try {
        // retrieve the request body data
        const {
            _id,
            product_id,
            user_id,
            quantity,
            price,
        } = req.body;

        const cart = await Cart.updateOne(
            { _id },
            {
                product_id,
                user_id,
                quantity,
                price,
                subtotal: quantity * price,
            });
        if (cart.modifiedCount) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { cart },
                message: "Product updated"
            })
        } else {
            // send data as json
            res.status(400).json({
                status: "success",
                data: { cart },
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
    updateCart
}