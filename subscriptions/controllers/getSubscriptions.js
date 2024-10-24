const { Subscription } = require("../models/subscription.model");

/** 
 * Get one subscriptions
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getSubscriptions = async (req, res) => {
    try {
        const _id = req.params.id
        const subscriptions = await Subscription.findById(_id).exec();
        // send success data
        if (Object.keys(subscriptions).length) {
            res.status(200).json({
                status: "success",
                data: { subscriptions },
                subscriptions: "Profile read",
            });
        } else {
            res.status(404).json({
                status: "success",
                data: { subscriptions },
                subscriptions: "No subscriptions found",
            });
        }


    } catch (error) {
        // catch  the error
        console.warn(error);
        // send error response
        res.status(500).json({
            status: "failed",
            data: null,
            subscriptions: "Error! "+error.subscriptions
        })
    }

}

module.exports = {
    getSubscriptions
}