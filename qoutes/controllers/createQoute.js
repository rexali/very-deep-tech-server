const { Qoute } = require("../models/qoute.model");
/**
 * Create a qoute
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const createQoute = async (req, res) => {

    try {
        // retrieve the request body data
        const {
            email,
            phone,
            productId,
            message
        } = req.body;

        const qoute = await Qoute.create(
            {
                email,
                phone,
                product: productId,
                message,
                createdAt: new Date(),
                updatedAt: new Date()
            });

        if (qoute != null) {
            // send data as json
            res.status(200).json({
                status: "success",
                data: { qoute },
                message: "Qoute created"
            })
        } else {
            // send data as json
            res.status(400).json({
                status: "success",
                data: { qoute: null },
                message: "Qoute creation failed"
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
    createQoute
}