const { Cart } = require("../models/cart.model");

/** 
 * Get all carts
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getCarts = async (req, res) => {
    try {
        const page = parseInt(req.query.page ?? 1);
        const limit = 10;
        const skip = (page - 1) * limit;

        const carts = await Cart.find()
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate("product")
            .exec();

        const totalCarts = (await Cart.find()).length;

        const newCarts = JSON.parse(JSON.stringify(carts)).map(cart => ({
            ...cart,
            totalCarts
        })).reverse(); 

        if (carts != null) {
            if (carts.length) {
                res.status(200).json({
                    status: "success",
                    data: { carts: newCarts },
                    message: "Carts found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { carts: [] },
                    message: "No carts found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { carts: null },
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
    getCarts
}