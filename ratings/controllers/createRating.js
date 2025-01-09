const { Product } = require("../../products/models/product.model");
const { Rating } = require("../models/rating.model");
const Joi = require('joi');
const { escape } = require('html-escaper');

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

        let subdomain = req.body?.subdomain ?? "";
        // let us validate inputs
        const schema = Joi.object({
            review: Joi.string().required(),
            subdomain: Joi.string()
        });

        const { error, value } = schema.validate({ review, subdomain });

        if (error) {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: null,
                message: "Error! " + error.message
            })
        } else {

            // let us sanitize our inputs
            let reviewx = escape(review);
            let subdomainx = escape(subdomain);

            const rating = await Rating.create({
                ratingScore,
                review: reviewx,
                product: productId,
                user: userId,
                subdomain: subdomainx
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