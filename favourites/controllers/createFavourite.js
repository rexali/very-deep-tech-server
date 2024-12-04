const { Product } = require("../../products/models/product.model");
const { Favourite } = require("../models/favourite.model");
/**
 * Create a favourite
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const createFavourite = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            product_id,
            user_id
        } = req.body;

        const favourite = await Favourite.create({
            product: product_id,
            user: user_id
        });
         // update module lessons
         const product = await Product.findById(product_id).populate("likes");
         product.likes.push(favourite._id);
         // save
         await product.save();
         await favourite.save();

        if (favourite !== null) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { favourite },
                message: "Cart created"
            })

        } else {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: { favourite },
                message: "creation failed"
            })
        }
 
    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(500).json({
            status: "failed",
            data: result,
            message: "Error! " + error.message

        })
    }

};

module.exports = {
    createFavourite
}