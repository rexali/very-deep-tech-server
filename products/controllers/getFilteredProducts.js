const { Product } = require("../models/product.model");

/** 
 * Get all products
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getFilteredProducts = async (req, res) => {
    try {
        const filter1 = req.query.filter1;
        const filter2 = req.query.filter2;
        const subdomain = req.query.subdomain ?? "";
        const page = parseInt(req.query.page ?? 1);
        const limit = 4;
        const skip = (page - 1) * limit;

        let products;
        if (subdomain !== 'maindomain') {

            products = await Product.find({ subdomain })
                .where('product_price').gte(filter1).lte(filter2)
                .skip(skip)
                .limit(limit)
                .populate("user", ["_id", "email", "role"])
                .populate("likes")
                .exec();
        } else {

            products = await Product.find()
                .where('product_price').gte(filter1).lte(filter2)
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

module.exports = {
    getFilteredProducts
}