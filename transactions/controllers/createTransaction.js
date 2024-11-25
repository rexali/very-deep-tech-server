const { Order } = require("../../orders/models/order.model");
const { Transaction } = require("../models/transaction.model");

/**
 * Create a transaction
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const createTransaction = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            orderId,
            userId,
            amount,
            type, // payment, refund, void
            reference,
            currency,
            paymentMethod,
            paymentStatus, //pending, paid etc for order
        } = req.body;

        const transaction = await Transaction.create({
            order: orderId,
            user: userId,
            amount,
            type, // payment, refund, void
            reference,
            currency,
            paymentMethod
        });


        const order = await Order.updateOne({ _id: orderId },
            {
                paymentStatus: paymentStatus ?? "paid",
                updatedAt: new Date(),
            });

        if (order.modifiedCount) {

            if (transaction !== null) {
                // send data as json
                res.status(200).json({
                    status: "success",
                    data: { transaction },
                    message: "Transaction created"
                })

            } else {
                // send data as json
                res.status(400).json({
                    status: "failed",
                    data: { transaction },
                    message: "Transaction creation failed"
                })
            }
        } else {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: { transaction },
                message: "Transaction creation failed"
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
    createTransaction
}