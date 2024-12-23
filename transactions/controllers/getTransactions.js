const { Transaction } = require("../models/transaction.model");

/** 
 * Get all transcations
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getTransactions = async (req, res) => {
    try {
        const page = parseInt(req.query.page ?? 1);
        const limit = 4;
        const skip = (page - 1) * limit;
        const transactions = await Transaction.find()
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate({
                path: 'order',
                model: "Order"
            })
            .exec();

        const totalTransactions = (await Transaction.find()).length;
        const newTransactions = JSON.parse(JSON.stringify(transactions)).map(transaction => ({
            ...transaction,
            totalTransactions: totalTransactions,
            totalAmount: transactions.map(transaction => Number(transaction.amount))
                .reduce((prev, curr) => prev + curr, 0)
        })).reverse();

        if (transactions != null) {
            if (transactions.length) {
                res.status(200).json({
                    status: "success",
                    data: { transactions: newTransactions },
                    message: "Transaction read",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { transactions: [] },
                    message: "No transaction found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { transactions: null },
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
    getTransactions
}