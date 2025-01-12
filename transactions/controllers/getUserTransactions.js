const { Transaction } = require("../models/transaction.model");

/** 
 * Get all transactions
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getUserTransactions = async (req, res) => {
    try {

        const userId = req.params.id;
        const page = parseInt(req.params.page ?? 1);
        const limit = 4;
        const skip = (page - 1) * limit;
        const subdomain = req.params?.subdomain ?? "";

        let transactions;
        if (subdomain == "maindomain" || "" || undefined) {
            transactions = await Transaction.find({ user: userId})
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .populate("user", ["userId", "email", "role"])
                .populate({
                    path: 'order',
                    model: "Order"
                })
                .exec();

        } else {
            transactions = await Transaction.find({ user: userId, subdomain })
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .populate("user", ["userId", "email", "role"])
                .populate({
                    path: 'order',
                    model: "Order"
                })
                .exec();

        }


        const totalTransactions = (await Transaction.find({ user: userId })).length;
        const newTransactions = JSON.parse(JSON.stringify(transactions)).map(transaction => ({
            ...transaction,
            totalTransactions: totalTransactions,
            totalAmount: transactions.map(transaction => Number(transaction.amount))
                .reduce((prev, curr) => prev + curr, 0)
        }));

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
    getUserTransactions
}