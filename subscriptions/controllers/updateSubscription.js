const { Message } = require("../models/subscription.model");
const Joi = require('joi');
const { escape } = require('html-escaper')
/**
 * Update subscription
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const updateSubscription = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            subscriptionId,
            email
        } = req.body;
        // let us validate inputs
        const schema = Joi.object({
            subscriptionId: Joi.string().required(),
            email: Joi.string().email().required(),
        });

        const { error, value } = schema.validate({ email, subscriptionId });

        if (error) {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: null,
                message: "Error! " + error.message
            })
        }
        // let us sanitize our inputs
        let emailx = escape(email);
        // let store it in db
        const subscription = await Message.updateOne({ _id: subscriptionId },
            {
                email: emailx,
                updatedAt: new Date(),
            });
        if (subscription.modifiedCount) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { subscription },
                message: "Subscription updated"
            })
        } else {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { subscription },
                message: "Subscription update failed"
            })
        }

    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(500).json({
            status: "failed",
            data: null,
            message: "Error! " + error.message

        })
    }

};

module.exports = {
    updateSubscription
}