const { Qoute } = require("../models/qoute.model");
/** 
 * Get all qoutes
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getQoute = async (req, res) => {
    try {
        const id = req.params.id;

        const qoute = await Qoute.findById(id)
            .populate('product')
            .exec();
        // send success data
        if (qoute != null) {
            if (Object.keys(qoute).length) {
                res.status(200).json({
                    status: "success",
                    data: { qoute },
                    message: "Qoute found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { qoute: {} },
                    message: "No qoute found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { qoute: null },
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
            message: "Error! " + error.message
        })
    }

}

module.exports = {
    getQoute
}
