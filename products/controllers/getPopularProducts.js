const { Product } = require("../models/product.model");
const { Order } = require("../../orders/models/order.model");
const { name } = require("ejs");

/** 
 * Get all products
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void 
 */
const getPopularProducts = async (req, res) => {

    try {
        const page = parseInt(req.params?.page ?? 1);
        const limit = 4;
        const skip = (page - 1) * limit;

        const products = await Product.find()
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate("ratings")
            .populate("likes")
            .sort({ likes: -1 })
            .exec();

        const totalProducts = (await Product.find()).length;
        // get the products
        let newProducts = JSON.parse(JSON.stringify(products)).map((product) => ({
            ...product,
            totalProducts,
            averageRating: product.ratings.map(rating => Number(rating?.ratingScore ?? 0))
                .reduce((prev, curr) => prev + curr, 0) / product.ratings.length
        }))

        if (products != null) {
            if (products.length) {
                res.status(200).json({
                    status: "success",
                    data: { products: newProducts },
                    message: "Products found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { products: [] },
                    message: "No products found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { products: null },
                message: "No products found",
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

async function getPopular(req, res) {
    const subdomain = req.query?.subdomain ?? ""
    const page = parseInt(req.query?.page ?? 1);
    const limit = 4;
    const skip = (page - 1) * limit;
    let products;
    if (subdomain == 'maindomain' || "" || undefined) {
        products = await Product.find()
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate("ratings")
            .populate("likes")
            .sort({ likes: -1 })
            .exec();
    } else {
        products = await Product.find({subdomain})
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate("ratings")
            .populate("likes")
            .sort({ likes: -1 })
            .exec();

    }

    const totalProducts = (await Product.find()).length;
    // get the products
    let newProducts = JSON.parse(JSON.stringify(products)).map((product) => ({
        ...product,
        totalProducts,
        averageRating: product.ratings.map(rating => Number(rating?.ratingScore ?? 0))
            .reduce((prev, curr) => prev + curr, 0) / product.ratings.length
    }));

    return newProducts;
}

module.exports = {
    getPopularProducts,
    getPopular
}