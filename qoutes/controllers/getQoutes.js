const { Qoute } = require("../models/qoute.model");
/** 
 * Get all qoutes
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getQoutes = async (req, res) => {
    try {
        const page = parseInt(req.query?.page ?? 1);
        const limit = 4;
        const skip = (page - 1) * limit;
        const subdomain = req.query?.subdomain ?? "";
        let qoutes;
        if (subdomain == "maindomain" || "" || undefined) {
            qoutes = await Qoute.find()
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .populate('product')
                .exec();
        } else {
            qoutes = await Qoute.find({subdomain})
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .populate('product')
                .exec();
        }


        const totalQoutes = (await Qoute.find()).length;

        const newQoutes = JSON.parse(JSON.stringify(qoutes)).map(qoute => ({
            ...qoute,
            totalQoutes
        })).reverse();

        // send success data

        if (qoutes != null) {
            if (qoutes.length) {
                res.status(200).json({
                    status: "success",
                    data: { qoutes: newQoutes },
                    message: "Qoutes found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { qoutes: [] },
                    message: "No qoutes found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { qoutes: null },
                message: "No qoutes found",
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
    getQoutes
}
