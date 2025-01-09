const { Notification } = require("../models/notification.model");
const Joi = require('joi');
const { escape } = require('html-escaper');
/**
 * Create a notification
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const createNotification = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            title,
            body,
            userId
        } = req.body;
        let subdomain = req.body?.subdomain ?? "";
        // let us validate inputs
        const schema = Joi.object({
            title: Joi.string().required(),
            body: Joi.string().required(),
            userId: Joi.string(),
            subdomain: Joi.string()
        });

        const { error, value } = schema.validate({ title, body, userId, subdomain });

        if (error) {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: null,
                message: "Error! " + error.message
            })
        } else {

            // let us sanitize our inputs
            let titlex = escape(title);
            let bodyx = escape(body);
            let userIdx = escape(userId);
            let subdomainx = escape(subdomain);

            const notification = await Notification.create(
                {
                    title: titlex,
                    body: bodyx,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    user: userIdx,
                    subdomain: subdomainx
                });

            if (notification != null) {
                // send data as json
                res.status(200).json({
                    status: "success",
                    data: { notification },
                    message: "Notification created"
                })
            } else {
                // send data as json
                res.status(400).json({
                    status: "failed",
                    data: { notification },
                    message: "Notification creation failed"
                })
            }
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
    createNotification
}