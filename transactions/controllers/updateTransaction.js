const { Transaction } = require("../models/order.model");
/**
 * Update transaction
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const updateTransaction = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            _id,
           type, // payment, refund
           status,
        } = req.body;

        const transaction = await Transaction.updateOne({ _id },
            {
                type,
                status,
                updatedAt: new Date(),
            });
        if (transaction.modifiedCount) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { transaction },
                message: "Transaction updated"
            })
        } else {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { transaction },
                message: "Transaction update failed"
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
    updateTransaction
}