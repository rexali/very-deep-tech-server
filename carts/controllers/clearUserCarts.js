const { Cart } = require("../models/cart.model");

/** 
 * Remove a cart
 * @param {object} req - request object
 * @param {object} res - response object to user request
 */
const clearUserCart = async (req, res) => {
    try {
        // get a client id
        const userId = req.params.userId;
        //    delete cart
        const cart = await Cart.deleteMany({ user: userId });

        if (cart.deletedCount) {
            // send success data
            res.status(200).json({
                status: "success",
                data: { cart },
                message: "user carts deleted",
            });
        } else {
            // send success data
            res.status(400).json({
                status: "failed",
                data: { cart },
                message: "cart deletion failed",
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
    clearUserCart
}