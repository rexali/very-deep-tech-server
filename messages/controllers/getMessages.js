const { Message } = require("../models/message.model");
/** 
 * Get all messages
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getMessages = async (req, res) => {
    try {
        const page = parseInt(req.query?.page ?? 1);
        const limit = 4;
        const skip = (page - 1) * limit;

        const messages = await Message.find()
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', ["_id", "email", "role"])
            .exec();

        const totalMessages = (await Message.find()).length;
        const newMessages = JSON.parse(JSON.stringify(messages)).map(msg => ({
            ...msg,
            totalMessages
        }));

        if (messages != null) {
            if (messages.length) {
                res.status(200).json({
                    status: "success",
                    data: { messages: newMessages },
                    message: "Messages found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { messages: [] },
                    message: "No messages found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { messages: null },
                message: "No messages found",
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
    getMessages
}
