const { Subscription  } = require("../models/subscription.model");
/** 
 * Delete subscription
 * @param {object} req - request object
 * @param {object} res - response object to user request
 */
const deleteSubscription = async (req, res) => {
    try {
        // get a notice id
        const _id = req.body.id;
        // delete subscription
        const subscription = await Subscription.deleteOne({ _id });
        // send success data
        if (subscription.deletedCount) {
            res.status(200).json({
                status: "success",
                data: { subscription },
                message: "Subscription  deleted",
            });
        } else {
            res.status(200).json({
                status: "success",
                data: { subscription },
                message: "Subscription  deletion failed",
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
    deleteSubscription
}