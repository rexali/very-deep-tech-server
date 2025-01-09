const { Qoute } = require("../models/qoute.model");
const Joi = require('joi');
const { escape } = require('html-escaper');

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
        let subdomain= req.body?.subdomain??"";

        // let us validate inputs
        const schema = Joi.object({
            productId: Joi.string().required(),
            message: Joi.string().required(),
            phone: Joi.string().required(),
            email: Joi.string().email().required(),
            subdomain:Joi.string()
        });

        const { error, value } = schema.validate({
            email,
            phone,
            productId,
            message,
            subdomain
        });

        if (error) {
            // send data as json
            res.status(400).json({
                status: "failed",
                data: null,
                message: "Error! " + error.message
            })
        } else {

            // let us sanitize our inputs
            let emailx = escape(email);
            let phonex = escape(phone);
            let productID = escape(productId);
            let messagex = escape(message);
            let subdomainx=escape(subdomain)

            const qoute = await Qoute.create(
                {
                    email: emailx,
                    phone: phonex,
                    product: productID,
                    message: messagex,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    subdomain:subdomainx
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