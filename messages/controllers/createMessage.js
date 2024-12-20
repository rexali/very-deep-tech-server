const { Message } = require("../models/message.model");
const Joi = require('joi');
const { escape } = require('html-escaper');

/**
 * Create a message
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const createMessage = async (req, res) => {
 
    try {
        // retrieve the request body data
        const title = req.body.title;
        const comment = req.body.comment;
        const user = req.body?.userId ?? "";
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
            lastName: Joi.string()
        });

        const { error, value } = schema.validate({ title, comment, user, sender, firstName, lastName });

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
            let commentx = escape(comment);
            let senderx = escape(sender);
            let firstNamex = escape(firstName);
            let lastNamex = escape(lastName);

            let message;

            if (user) {
                message = await Message.create(
                    {
                        title: titlex,
                        comment: commentx,
                        sender: senderx,
                        firstName: firstNamex,
                        lastName: lastNamex,
                        user,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });
            } else {
                message = await Message.create(
                    {
                        title: titlex,
                        comment: commentx,
                        sender: senderx,
                        firstName: firstNamex,
                        lastName: lastNamex,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });
            }


            if (message != null) {
                // send data as json
                res.status(200).json({
                    status: "success",
                    data: { message },
                    message: "Message created"
                })
            } else {
                // send data as json
                res.status(400).json({
                    status: "failed",
                    data: { message },
                    message: "Message creation failed"
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
    createMessage
}