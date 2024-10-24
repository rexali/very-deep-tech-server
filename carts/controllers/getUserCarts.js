const { Cart } = require("../models/cart.model");

/** 
 * Get all carts
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getUserCarts = async (req, res) => {
    const _id = req.params.id;
    const page = parseInt(req.query.page ?? 1);
    const limit = 10;
    const skip = (page - 1) * limit;
    try {
        const carts = await Cart.find({ user: _id })
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate("product")
            .exec();

        if (carts.length) {
            // send success data
            res.status(200).json({
                status: "success",
                data: {
                    carts
                },
                message: "Cart read",
            });
        } else {
            // send success data
            res.status(400).json({
                status: "success",
                data: { carts },
                message: "Cart read",
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
    getUserCarts
}