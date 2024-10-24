const { Order } = require("../models/order.model");
/**
 * Create a order
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const createOrder = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            product_id,
            user_id,
            items, // array of items
            orderStatus,
            tax,
            subtotal,
            shippingCost,
            total
        } = req.body;

        const order = await Order.create({
            product: product_id,
            user: user_id,
            items,
            orderStatus,
            tax,
            subtotal,
            shippingCost,
            total,
        });

        if (order !== null) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { order },
                message: "Order created"
            })

        } else {
            // send data as json
            res.status(400).json({
                status: "success",
                data: { order },
                message: "Order creation failed"
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
    createOrder
}