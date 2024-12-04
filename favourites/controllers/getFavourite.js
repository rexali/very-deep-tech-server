const { Favourite } = require("../models/favourite.model");

/** 
 * Get all favourites
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getFavourite = async (req, res) => {
    const id = req.params.id;
    try {
        const favourite = await Favourite.findById(id) 
            .populate("user", ["_id", "email", "role"])
            .populate("product")
            .exec();


        if (favourite != null) {
            if (Object.keys(favourite).length) {
                res.status(200).json({
                    status: "success",
                    data: { favourite },
                    message: "Favourites found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { favourite },
                    message: "No favourites found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { favourite: null },
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
    getFavourite
}