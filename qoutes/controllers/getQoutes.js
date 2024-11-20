const { Qoute } = require("../models/qoute.model");
/** 
 * Get all qoutes
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getQoutes = async (req, res) => {
    try {
        const page = parseInt(req.params?.page ?? 1);
        const limit = 10;
        const skip = (page - 1) * limit;

        const qoutes = await Qoute.find()
            .skip(skip)
            .limit(limit)
            .populate('product')
            .exec();
        // send success data
        if (qoutes != null) {
            res.status(200).json({
                status: "success",
                data: { qoutes },
                message: "Qoutes read",
            });
        } else {
            res.status(404).json({
                status: "success",
                data: { qoutes:[] },
                message: "No qoute found",
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
    getQoutes
}