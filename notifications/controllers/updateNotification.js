const { Notification } = require("../models/notification.model");
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
            _id,
            title,
            body
        } = req.body;

        const notification = await Notification.updateOne({ _id },
            {
                title,
                body,
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
            res.status(200).json({
                status: "success",
                data: { notification },
                message: "Notification update failed"
            })
        }

    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(200).json({
            status: "failed",
            data:null,
            message: "Error! "+error.message

        })
    }

};

module.exports = {
    updateNotification
}