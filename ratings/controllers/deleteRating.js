const { Rating } = require("../models/rating.model");

/** 
 * Remove a rating
 * @param {object} req - request object
 * @param {object} res - response object to user request
 */
const deleteRating = async (req, res) => {
    try {
        // get a rating's id
        const _id = req.body._id;
        //    delete rating
        const rating = await Rating.deleteOne({ _id });

        if (rating.deletedCount) {
            // send success data
            res.status(200).json({
                status: "success",
                data: { rating },
                message: "Rating deleted",
            });
        } else {
            // turn to json data
            res.status(400).json({
                status: "success",
                data: { rating },
                message: "Rating deletion failed",
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
    deleteRating
}