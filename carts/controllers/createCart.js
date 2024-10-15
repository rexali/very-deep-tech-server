const {Cart } = require("../models/cart.model");
/**
 * Create a cart
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const createCart = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            product_id,
            user_id
        } = req.body;
 
        const cart = await Cart.create({
            product:{_id: product_id },
            user: { _id: user_id }
        });

        if (cart !== null) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { cart },
                message: "Cart created"
            })

        } else {
            // send data as json
            res.status(400).json({
                status: "success",
                data: { cart },
                message: "Cart creation failed"
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
    createCart
}