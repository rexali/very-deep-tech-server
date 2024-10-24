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
                model: "Order",
                populate: {
                    path: 'product',
                    model: "Product",
                }
            })
            .exec();
        // send success data
        if (Object.keys(transaction).length) {
            res.status(200).json({
                status: "success",
                data: { transaction },
                transaction: "Profile read",
            });
        } else {
            res.status(404).json({
                status: "success",
                data: { transaction },
                transaction: "No transaction found",
            });
        }


    } catch (error) {
        // catch  the error
        console.warn(error);
        // send error response
        res.status(500).json({
            status: "failed",
            data: null,
            transaction: "Error! " + error.transaction
        })
    }

}

module.exports = {
    getTransaction
}