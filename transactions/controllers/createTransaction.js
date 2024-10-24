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
            order_id,
            user_id,
            amount,
            type, // payment, refund, void
            status,
            reference,
            currency,
            paymentMethod
        } = req.body;

        const transaction = await Transaction.create({
            order: order_id,
            user: user_id,
            amount,
            type, // payment, refund, void
            status,
            reference,
            currency,
            paymentMethod
        });

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
                status: "success",
                data: { transaction },
                message: "Transaction creation failed"
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
    createTransaction
}