const { Notification } = require("../models/notification.model");
const Joi = require('joi');
const { escape } = require('html-escaper');
/**
 * Update notification
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const updateNotification = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            title,
            body,
            notificationId
        } = req.body;
        // let us validate inputs
        const schema = Joi.object({
            title: Joi.string().required(),
            body: Joi.string().required(),
            userId: Joi.string(),
        });

        const { error, value } = schema.validate({ title, body, userId });

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
            let notificationIdx = escape(notificationId);


            const notification = await Notification.updateOne({ _id: notificationIdx },
                {
                    title: titlex,
                    body: bodyx,
                    updatedAt: new Date(),
                });

            if (notification.modifiedCount) {
                // send data as json
                res.status(200).json({
                    status: "success",
                    data: { notification },
                    message: "Notification updated"
                })
            } else {
                // send data as json
                res.status(400).json({
                    status: "failed",
                    data: { notification },
                    message: "Notification update failed"
                })
            }
        }

    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(200).json({
            status: "failed",
            data: null,
            message: "Error! " + error.message

        })
    }

};

module.exports = {
    updateNotification
}