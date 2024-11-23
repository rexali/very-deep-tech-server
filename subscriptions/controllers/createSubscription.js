const { Subscription } = require("../models/subscription.model");
/**
 * Create a subscription
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const createSubscription = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            email
        } = req.body;

        const subscription = await Subscription.create(
            {
                email
            });
 
        if (subscription != null) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { subscription },
                subscription: "Subscription created"
            })
        } else {
            // send data as json
            res.status(400).json({
                status: "success",
                data: { subscription: null },
                subscription: "Subscription creation failed"
            })
        }

    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(500).json({
            status: "failed",
            data: null,
            subscription: "Error! " + error.subscription

        })
    }

};

module.exports = {
    createSubscription
}