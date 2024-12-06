const { Submission, Rating } = require("../models/rating.model");

/** 
 * Get a rating
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getRating = async (req, res) => {
    try {
        const _id = req.params.id; // rating's id
        const rating = await Rating.findById(_id)
            .populate("product")
            .populate("user") 
            .exec();

            if (rating != null) {
                if (Object.keys(rating).length) {
                    res.status(200).json({
                        status: "success",
                        data: { rating },
                        message: "Rating found",
                    });
                } else { 
                    res.status(404).json({
                        status: "failed",
                        data: { rating: {} },
                        message: "No rating found",
                    });
                }
            } else {
                res.status(400).json({
                    status: "failed",
                    data: { rating: null },
                    message: "No rating found",
                });
            }


    } catch (error) {
        // catch  the error
        console.warn(error);
        // send error response
        res.status(200).json({
            status: "failed",
            data: null,
            message: "Error! "+error.message
        })
    }

}

module.exports = {
    getRating
}