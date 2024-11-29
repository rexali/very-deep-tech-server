const { Notification } = require("../models/notification.model");

/** 
 * Get all notifications
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getNotifications = async (req, res) => {
    try {
        const page = parseInt(req.params?.page ?? 1);
        const limit = 4;
        const skip = (page - 1) * limit;

        const notifications = await Notification.find()
            .skip(skip)
            .limit(limit)
            .populate('user', ["_id", "email", "role"])
            .exec();

        const totalNotifications = (await Notification.find()).length;

        const newNotifications = JSON.parse(JSON.stringify(notifications)).map(notice => ({
            ...notice,
            totalNotifications
        }))
        // send success data
        if (notifications != null) {
            if (notifications.length) {
                res.status(200).json({
                    status: "success",
                    data: { notifications: newNotifications },
                    message: "Notifications found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { notifications: [] },
                    message: "No notifications found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { notifications: null },
                message: "No notifications found",
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
    getNotifications
}
