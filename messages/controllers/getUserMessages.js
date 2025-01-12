const { Message } = require("../models/message.model");
/** 
 * Get all messages
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getUserMessages = async (req, res) => {
    try {
        const subdomain = req.params?.subdomain ?? "";
        const page = parseInt(req.params?.page ?? 1);
        const userId = req.params?.userId;
        const limit = 4;
        const skip = (page - 1) * limit;
        
        let messages;
        if (subdomain == "maindomain" || "" || undefined) {
            messages = await Message.find({ user: userId })
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .populate('user', ["_id", "email", "role"])
                .exec();
        } else {
            messages = await Message.find({ user: userId, subdomain })
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .populate('user', ["_id", "email", "role"])
                .exec();
        }



        const totalMessages = (await Message.find()).length;
        const newMessages = JSON.parse(JSON.stringify(messages)).map(message => ({
            ...message,
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
    getUserMessages
}
