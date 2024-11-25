const { Order } = require("../models/order.model");

/** 
 * Get all order
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getOrder = async (req, res) => {
    try {
        const _id = req.params.id;
        
        const order = await Order.findById(_id)
            .populate("user", ["_id", "email", "role"])
            .exec();


            if (order != null) {
                if (Object.keys(order).length) {
                    res.status(200).json({
                        status: "success",
                        data: { order },
                        message: "Order found",
                    });
                } else { 
                    res.status(404).json({
                        status: "failed",
                        data: { order: {} },
                        message: "No order found",
                    });
                }
            } else {
                res.status(400).json({
                    status: "failed",
                    data: { order: null },
                    message: "No order found",
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
    getOrder
}