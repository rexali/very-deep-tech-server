const { Favourite } = require("../models/favourite.model");

/** 
 * Get all favourites
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getUserFavourites = async (req, res) => {
    const userId = req.params.userId;
    const page = parseInt(req.params.page ?? 1);
    const limit = 4;
    const skip = (page - 1) * limit;
    try {
        const favourites = await Favourite.find({ user: userId })
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate("product")
            .exec();

        const totalFavourites = (await Favourite.find({ user: userId })).length;
        const newFavourites = JSON.parse(JSON.stringify(favourites)).map(favourite => ({
            ...favourite,
            totalFavourites
        }));

        if (favourites != null) {
            if (favourites.length) {
                res.status(200).json({
                    status: "success",
                    data: { favourites: newFavourites },
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