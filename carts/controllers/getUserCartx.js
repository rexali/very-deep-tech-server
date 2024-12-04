const { Cart } = require("../models/cart.model");

/** 
 * Get all carts
 * @param {object} req - request object
 * @param {object} res - response object to user request
 * @returns void
 */
const getUserCartx = async (req, res) => {


    try {
        
        const userId = req.params.userId;
       
        const carts = await Cart.find({ user: userId })  
            .populate("user", ["_id", "email", "role"])
            .populate("product")
            .exec();

        const totalCarts = (await Cart.find()).length;
        const newCarts = JSON.parse(JSON.stringify(carts)).map(cart => ({
            ...cart,
            totalCarts
        }))

        if (carts != null) {
            if (carts.length) {
                res.status(200).json({
                    status: "success",
                    data: { carts: newCarts },
                    message: "Carts found",
                });
            } else {
                res.status(404).json({
                    status: "failed",
                    data: { carts: [] },
                    message: "No carts found",
                });
            }
        } else {
            res.status(400).json({
                status: "failed",
                data: { carts: null },
                message: "No carts found",
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
    getUserCartx
}