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
            .populate("product")
            .exec();

        if (order.length) {
            // send success data
            res.status(200).json({
                status: "success",
                data: { order },
                message: "Order read",
            });
        } else {
            // send success data
            res.status(400).json({
                status: "success",
                data: { order },
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
    getOrder
}