const { Order } = require("../models/order.model");
/**
 * Update order
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const updateOrder = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            _id,
            orderStatus
        } = req.body;

        const order = await Order.updateOne({ _id },
            {
                orderStatus,
                updatedAt: new Date(),
            });
        if (order.modifiedCount) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { order },
                message: "Order updated"
            })
        } else {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { order },
                message: "Order update failed"
            })
        }

    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(200).json({
            status: "failed",
            data:null,
            message: "Error! "+error.message

        })
    }

};

module.exports = {
    updateOrder
}