const { Transaction } = require("../models/transaction.model");

/** 
 * Get one transaction
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getTransaction = async (req, res) => {
    try {
        const _id = req.params.id
        const transaction = await Transaction.findById(_id)
            .populate('user', ["_id", "email", "role"])
            .populate({
                path: 'order',
                model: "Order"
            })
            .exec();
        // send success data
        if (transaction != null) {
            if (Object.keys(transaction).length) {
                res.status(200).json({
                    status: "success",
                    data: { transaction },
                    message: "Transaction read",
                });
            } else { 
                res.status(404).json({
                    status: "failed",
                    data: { transaction: {} },
                    message: "No transaction found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { transaction: null },
                message: "No transaction found",
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
    getTransaction
}