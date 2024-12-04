const { Favourite } = require("../models/favourite.model");

/** 
 * Remove a favourite
 * @param {object} req - request object
 * @param {object} res - response object to user request
 */
const deleteUserFavourite = async (req, res) => {
    try {
        // get a client id
        const userId = req.params.userId;
        const productId = req.params.productId;
        //    delete favourite
        const favourite = await Favourite.deleteOne({ user: userId, product: productId });

        if (favourite.deletedCount) {
            // send success data 
            res.status(200).json({
                status: "success",
                data: { favourite },
                message: "favourite deleted",
            });
        } else {
            // send success data
            res.status(400).json({
                status: "failed",
                data: { favourite },
                message: "favourite deletion failed",
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
    deleteUserFavourite
}