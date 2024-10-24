const { Notification } = require("../models/notification.model");
/**
 * Create a notification
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const createNotification = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            title,
            body,
            _id // userId
        } = req.body;

        const notification = await Notification.create(
            {
                title,
                body,
                createdAt: new Date(),
                updatedAt: new Date(),
                user: _id 
            });

        if (notification != null) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { notification },
                message: "Notification created"
            })
        } else {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { notification },
                message: "Notification creation failed"
            })
        }

    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(500).json({
            status: "failed",
            data: result,
            message: "Error! "+error.message

        })
    }

};

module.exports = {
    createNotification
}