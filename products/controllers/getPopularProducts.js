const { Product } = require("../models/product.model");
const { Order } = require("../models/order.model");

/** 
 * Get all products
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void 
 */
const getPopularProducts = async (req, res) => {

    try {
        const page = parseInt(req.query?.page ?? 1);
        const limit = 4;
        const skip = (page - 1) * limit;

        const products = await Product.find()
            .skip(skip)
            .limit(limit)
            .populate("user", ["_id", "email", "role"])
            .populate("ratings")
            .exec();

        const totalProducts = (await Product.find()).length;
        // get the categories
        let categories = JSON.parse(JSON.stringify(products)).map((product) => product.product_category);
        // get popular products
        let orders = await Order.find();
        let popularProducts = JSON.parse(JSON.stringify(orders)).map(order=>order.items.map((item=>item.product)))[0].slice(0,2);
        // get the products
        let newProducts = popularProducts.map((product) => ({
            ...product,
            categories,
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

module.exports = {
    getPopularProducts
}