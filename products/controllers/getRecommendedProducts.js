const { Product } = require("../models/product.model");

/** 
 * Get all products
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getRecommendedProducts = async (req, res) => {
    try {
        // get the cookies
        const term = req.cookies.termCookie;
        // others 
        const subdomain = req.params.subdomain ?? "";
        const page = parseInt(req.params.page ?? 1);
        const limit = 4;
        const skip = (page - 1) * limit;
        const re = new RegExp(term, 'i');

        let products;
        if (subdomain == 'maindomain' || "" || undefined) {
            products = await Product.find({ product_name: re })
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .populate("user", ["_id", "email", "role"])
                .populate("likes")
                .exec();
        } else {
            products = await Product.find({ product_name: re, subdomain })
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .populate("user", ["_id", "email", "role"])
                .populate("likes")
                .exec();
        }


        const totalProducts = (await Product.find()).length;
        let newProducts = JSON.parse(JSON.stringify(products)).map((product) => ({
            ...product,
            totalProducts,
            averageRating: product.ratings.map(rating => Number(rating?.ratingScore ?? 0))
                .reduce((prev, curr) => prev + curr, 0) / product.ratings.length
        }));

        if (products != null) {
            if (products.length) {
                //  store in cookie
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

async function getRecommended(req, res) {
    // get the cookies
    const term = req.cookies.termCookie;
    // others 
    const page = parseInt(req.query.page ?? 1);
    const limit = 4;
    const skip = (page - 1) * limit;
    const re = new RegExp(term, 'i');
    const subdomain = req.query.subdomain ?? "";
    let products;
    if (subdomain == 'maindomain' || "" || undefined) {
        products = await Product.find({ product_name: re})
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate("likes")
            .exec();

    } else {
        products = await Product.find({ product_name: re, subdomain })
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate("likes")
            .exec();

    }

    const totalProducts = (await Product.find()).length;
    let newProducts = JSON.parse(JSON.stringify(products)).map((product) => ({
        ...product,
        totalProducts,
        averageRating: product.ratings.map(rating => Number(rating?.ratingScore ?? 0))
            .reduce((prev, curr) => prev + curr, 0) / product.ratings.length
    }));

    return newProducts
}

module.exports = {
    getRecommendedProducts,
    getRecommended
}