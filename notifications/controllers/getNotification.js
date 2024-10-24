const { Notification } = require("../models/notification.model");

/** 
 * Get one notification
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getNotification = async (req, res) => {
    try {
        const _id = req.params.id
        const notification = await Notification.findById(_id).populate('user', ["_id", "email", "role"]).exec();
        // send success data
        if (Object.keys(notification).length) {
            res.status(200).json({
                status: "success",
                data: { notification },
                message: "Profile read",
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
    getNotification
}