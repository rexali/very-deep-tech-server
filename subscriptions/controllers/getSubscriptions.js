const { Subscription } = require("../models/subscription.model");

/** 
 * Get one subscriptions
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getSubscriptions = async (req, res) => {
    try {

        const subscriptions = await Subscription.find();
        // send success data
        const totalSubscriptions = (await Subscription.find()).length;

        const newSubscriptions = JSON.parse(JSON.stringify(subscriptions)).map(subscription => ({
            ...subscription,
            totalSubscriptions: totalSubscriptions
        }));

        if (subscriptions != null) {
            if (subscriptions.length) {
                res.status(200).json({
                    status: "success",
                    data: { subscriptions: newSubscriptions },
                    message: "Subscriptions found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { subscriptions: [] },
                    message: "No subscriptions found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { subscriptions: null },
                message: "No subscriptions found",
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
    getSubscriptions
}