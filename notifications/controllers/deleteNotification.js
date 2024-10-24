const { Notification } = require("../models/notification.model");

/** 
 * Delete notification
 * @param {object} req - request object
 * @param {object} res - response object to user request
 */
const deleteNotification = async (req, res) => {
    try {
        // get a notice id
        const _id = req.body._id;
        // delete notification
        const notification = await Notification.deleteOne({ _id });
        // send success data
        if (notification.deletedCount) {
            res.status(200).json({
                status: "success",
                data: { notification },
                message: "Notification deleted",
            });
        } else {
            res.status(200).json({
                status: "success",
                data: { notification },
                message: "Notification deletion failed",
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
    deleteNotification
}