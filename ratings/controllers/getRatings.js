const { Rating } = require("../models/rating.model");
/** 
 * Get all ratings
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getRatings = async (req, res) => {
    try {
        const page = parseInt(req.query?.page ?? 1);
        const limit = 4;
        const skip = (page - 1) * limit;
        const subdomain = req.query.subdomain ?? "";

        let ratings;
        if (subdomain) {

            ratings = await Rating.find({ subdomain })
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .populate('product')
                .populate('user')
                .exec();
        } else {

            ratings = await Rating.find()
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .populate('product')
                .populate('user')
                .exec();
        }


        const totalRatings = (await Rating.find()).length;

        const newRatings = JSON.parse(JSON.stringify(ratings)).map(rating => ({
            ...rating,
            totalRatings
        }));

        // send success data

        if (ratings != null) {
            if (ratings.length) {
                res.status(200).json({
                    status: "success",
                    data: { ratings: newRatings },
                    message: "Qoutes found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { ratings: [] },
                    message: "No ratings found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { ratings: null },
                message: "No ratings found",
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
    getRatings
}
