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
            .populate("course")
            .populate("user") 
            .exec();
            
        if (Object.keys(rating).length) {
            // send success data
            res.status(200).json({
                status: "success",
                data: { rating },
                message: "Rating read",
            });
        } else {
            // send success data
            res.status(400).json({
                status: "success",
                data: { rating },
                message: "Rating reading failed",
            });
        }


    } catch (error) {
        // catch  the error
        console.warn(error);
        // send error response
        res.status(200).json({
            status: "failed",
            data: null,
            message: "Error!"
        })
    }

}

module.exports = {
    getRating
}