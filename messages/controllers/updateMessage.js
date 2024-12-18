const { Message } = require("../models/message.model");
const Joi = require('joi');
const { escape } = require('html-escaper')
/**
 * Update message
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const updateMessage = async (req, res) => {

    try {
        // retrieve the request body data
        const title = req.body.title;
        const comment = req.body.comment;
        const messageId = req.body.messageId;
        const sender = req.body.sender ?? ''; // email
        const firstName = req.body.firstName ?? '';
        const lastName = req.body.lastName ?? '';

        // let us validate inputs
        const schema = Joi.object({
            title: Joi.string().required(),
            comment: Joi.string().required(),
            user: Joi.string(),
            sender: Joi.string().email(),
            firstName: Joi.string(),
            lastName: Joi.string(),
            messageId: Joi.string().required(),
        });
 
        const { error, value } = schema.validate({ title, comment, user, sender, firstName, lastName, messageId });

        if (error) {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: null,
                message: "Error! " + error.message
            })
        }

        // let us sanitize inputs
        let titlex = escape(title);
        let commentx = escape(comment);
        let senderx = escape(sender);
        let firstNamex = escape(firstName);
        let lastNamex = escape(lastName);
        let messageIdx = escape(messageId);

        let message = await Message.updateOne({ _id: messageIdx },
            {
                title: titlex,
                comment: commentx,
                sender: senderx,
                firstName: firstNamex,
                lastName: lastNamex,
                updatedAt: new Date(),
            });
        if (message.modifiedCount) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { message },
                message: "Message updated"
            })
        } else {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: { message },
                message: "Message update failed"
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
    updateMessage
}