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
            userId,
            items, // array of items
            orderStatus,
            tax,
            subtotal,
            shippingCost,
            total,
            paymentStatus,
            shippingMethod
        } = req.body;

        let subdomain = req.body?.subdomain ?? "";


        const order = await Order.create({
            user: userId,
            items,
            orderStatus,
            tax,
            subtotal,
            shippingCost,
            total,
            paymentStatus,
            shippingMethod,
            subdomain
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
            data: null,
            message: "Error! " + error.message

        })
    }

};

module.exports = {
    createOrder
}