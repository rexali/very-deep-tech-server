const { Transaction } = require("../models/transaction.model");

/** 
 * Get all transactions
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getUserTransactions = async (req, res) => {
    const _id = req.params.id;
    const page = parseInt(req.query.page ?? 1);
    const limit = 10;
    const skip = (page - 1) * limit;
    try {
        const transactions = await Transaction.find({ user: _id })
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate({
                path: 'order',
                model: "Order",
                populate: {
                    path: 'product',
                    model: "Product",
                }
            })
            .exec();

        if (transactions.length) {
            // send success data
            res.status(200).json({
                status: "success",
                data: {
                    transactions
                },
                message: "Transaction read",
            });
        } else {
            // send success data
            res.status(400).json({
                status: "success",
                data: { transactions },
                message: "No Transaction Yet",
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