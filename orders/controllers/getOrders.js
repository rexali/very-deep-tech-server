const { Order } = require("../models/order.model");

/** 
 * Get all orders
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page ?? 1);
        const limit = 10;
        const skip = (page - 1) * limit;
        const orders = await Order.find()
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate("product")
            .exec();

        if (orders.length) {
            // send success data
            res.status(200).json({
                status: "success",
                data: { orders },
                message: "Order read",
            });
        } else {
            // send success data
            res.status(404).json({
                status: "success",
                data: { orders:[]},
                message: "No Order Yet",
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
    getOrders
}