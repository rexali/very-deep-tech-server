const { Subscription } = require("../models/subscription.model");
const Joi = require('joi');
const { escape } = require('html-escaper')
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
        // let us validate inputs
        const schema = Joi.object({
            email: Joi.string().email().required(),
        });

        const { error, value } = schema.validate({ email });

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
        const subscription = await Subscription.create(
            {
                email: emailx
            });

        if (subscription != null) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { subscription },
                message: "Subscription created"
            })
        } else {
            // send data as json
            res.status(400).json({
                status: "success",
                data: { subscription: null },
                message: "Subscription creation failed"
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
    createSubscription
}