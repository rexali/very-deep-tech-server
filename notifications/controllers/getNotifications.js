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
        const limit = 10;
        const skip = (page - 1) * limit;

        const notification = await Notification.find()
            .skip(skip)
            .limit(limit)
            .populate('user', ["_id", "email", "role"])
            .exec();
        // send success data
        if (notification != null) {
            res.status(200).json({
                status: "success",
                data: { notification },
                message: "Notification read",
            });
        } else {
            res.status(404).json({
                status: "success",
                data: { notification },
                message: "No notification found",
            });
        }


    } catch (error) {
        // catch  the error
        console.warn(error);
        // send error response
        res.status(500).json({
            status: "failed",
            data: null,
            message: "Error! "+error.message
        })
    }

}

module.exports = {
    getNotifications
}
