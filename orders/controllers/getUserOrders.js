const { Order } = require("../models/order.model");

/** 
 * Get all orders
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getUserOrders = async (req, res) => {
    const _id = req.params.id;
    const page = parseInt(req.query.page ?? 1);
    const limit = 10;
    const skip = (page - 1) * limit;
    try {
        const orders = await Order.find({ user: _id })
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate("product")
            .exec();

            if (orders != null) {
                if (orders.length) {
                    res.status(200).json({
                        status: "success",
                        data: { orders },
                        message: "Orders read",
                    });
                } else {
                    res.status(404).json({
                        status: "failed",
                        data: { orders: [] },
                        message: "No orders found",
                    });
                }
            } else {
                res.status(400).json({
                    status: "failed",
                    data: { orders: null },
                    message: "No orders found",
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
    getUserOrders
}