const { Rating } = require("../models/rating.model");
/**
 * Update a rating
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const updateRating = async (req, res) => {
    try {
        // retrieve the request body data
        const {
            _id,
            ratingScore,
            review,
            approved
        } = req.body;

        const rating = await Rating.updateOne({ _id }, {
            ratingScore,
            review,
            approved
        });

        if (rating.modifiedCount) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { rating },
                message: "Rating updated"
            })
        } else {
            // send data as json
            res.status(400).json({
                status: "success",
                data: { rating },
                message: "Rating update failed"
            })
        }

    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(500).json({
            status: "failed",
            data: null,
            message: "Update failed"

        })
    }
};

module.exports = {
    updateRating
}