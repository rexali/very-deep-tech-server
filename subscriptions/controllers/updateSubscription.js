const {Message } = require("../models/subscription.model");
/**
 * Update subscription
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const updateSubscription = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            _id,
            email
        } = req.body;

        const subscription = await Message.updateOne({_id},
            {
               email,
                updatedAt: new Date(),
            });
        if (subscription.modifiedCount) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { subscription },
                message: "Subscription updated"
            })
        } else {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { subscription },
                message: "Subscription update failed"
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
    updateSubscription
}