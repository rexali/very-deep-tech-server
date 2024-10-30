const { Product } = require("../../products/models/product.model");
const { Rating } = require("../models/rating.model");
/**
 * Create a rating
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const createRating = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            ratingScore,
            review,
            userId,
            productId
        } = req.body;

        const rating = await Rating.create({
            ratingScore,
            review,
            product: productId ,
            user: userId
        });
        // update module lessons
        const product = await Product.findById(productId).populate("ratings");
        product.ratings.push(rating._id);
        // save
        await product.save();
        await rating.save();

        if (rating != null) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { rating },
                message: "Rating created"
            })
        } else {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: null,
                message: "Rating creation failed"
            })
        }

    } catch (error) {
        console.warn(error);
        // send data as json
        res.status(500).json({
            status: "failed",
            data: null,
            message: "Error! " + error.message

        })
    }

};

module.exports = {
    createRating
}