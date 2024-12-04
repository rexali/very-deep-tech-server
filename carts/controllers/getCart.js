const { Cart } = require("../models/cart.model");

/** 
 * Get a cart
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getCart = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const cart = await Cart.findById(id)
            .populate("user", ["_id", "email", "role"])
            .populate("product")
            .exec();

        if (cart != null) {
            if (Object.keys(cart).length) {
                res.status(200).json({
                    status: "success",
                    data: { cart },
                    message: "Carts found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { cart },
                    message: "No carts found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { cart: null },
                message: "No carts found",
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
    getCart
}