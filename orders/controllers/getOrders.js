const { Order } = require("../models/order.model");

/** 
 * Get all orders
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getOrders = async (req, res) => {
    try {
        const subdomain = req.query?.subdomain ?? "";
        const page = parseInt(req.query.page ?? 1);
        const limit = 4;
        const skip = (page - 1) * limit;
        let orders;
        if (subdomain == "maindomain" || "" || undefined) {
            orders = await Order.find()
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .exec();
  
        } else {
            orders = await Order.find({subdomain})
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .exec();
  
        }

        const totalOrders = (await Order.find()).length;
        const newOrders = JSON.parse(JSON.stringify(orders)).map(order => ({
            ...order,
            totalOrders: totalOrders
        }));

        if (orders != null) {
            if (orders.length) {
                res.status(200).json({
                    status: "success",
                    data: { orders: newOrders },
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
    getOrders
}