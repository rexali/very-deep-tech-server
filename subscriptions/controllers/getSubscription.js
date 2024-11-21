const { Subscription } = require("../models/subscription.model");
/** 
 * Get all subscriptions
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getSubscription = async (req, res) => {
    try {
        const _id = req.params.id

        const subscription = await Subscription.findById(_id);
        // send success data
        if (subscription != null) {
            if (Object.keys(subscription).length) {
                res.status(200).json({
                    status: "success",
                    data: { subscription },
                    message: "Subscription found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { subscription: {} },
                    message: "No subscription found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { subscription: null },
                message: "No subscription found",
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
    getSubscription
}
