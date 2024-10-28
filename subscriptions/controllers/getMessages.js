const { Subscription } = require("../models/subscription.model");
/** 
 * Get all subscriptions
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getSubscriptions = async (req, res) => {
    try {
        const page = parseInt(req.params?.page ?? 1);
        const limit = 10;
        const skip = (page - 1) * limit;

        const subscriptions = await Subscription.find()
            .skip(skip)
            .limit(limit)
            .exec();
        // send success data
        if (subscriptions != null) {
            res.status(200).json({
                status: "success",
                data: { subscriptions },
                message: "Subscription read",
            });
        } else {
            res.status(404).json({
                status: "success",
                data: { subscriptions },
                message: "No Subscription Found",
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
    getSubscriptions
}
