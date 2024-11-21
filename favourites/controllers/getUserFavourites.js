const { Favourite } = require("../models/favourite.model");

/** 
 * Get all favourites
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getUserFavourites = async (req, res) => {
    const _id = req.params.id;
    const page = parseInt(req.query?.page ?? 1);
    const limit = 10;
    const skip = (page - 1) * limit;
    try {
        const favourites = await Favourite.find({ user: _id })
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate("product")
            .exec();

        if (favourites != null) {
            if (favourites.length) {
                res.status(200).json({
                    status: "success",
                    data: { favourites },
                    message: "Favourites found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { favourites: [] },
                    message: "No favourites found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { favourites: null },
                message: "No favourites found",
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
    getUserFavourites
}