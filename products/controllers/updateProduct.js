const { uploadMultipleFiles } = require("../../utils/uploadFile");
const { Product } = require("../models/product.model");
const multer = require("multer");
const { getFilesNames } = require("../utils/getFilesNames");
const Joi = require('joi');
const { escape } = require('html-escaper');

/**
 * Update product
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const updateProduct = async (req, res) => {
    try {
        uploadMultipleFiles('product_pictures')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                throw new Error(err.message)
            } else if (err) {
                // An unknown error occurred when uploading.
                throw new Error(err)
            };
            // Everything went fine, send the file name and other fields to database
            let files = req?.files ?? [];
            let filenames = getFilesNames([...files]);
            // retrieve the request body data
            const {
                productId,
                product_name,
                product_category,
                product_sub_category,
                product_description,
                product_price,
                product_quantity,
                product_weight,
                product_size,
                product_code,
                product_demos_links
            } = req.body;

            // let us validate inputs
            const schema = Joi.object({
                product_name: Joi.string().required(),
                product_category: Joi.string().required(),
                product_sub_categoryr: Joi.string().required(),
                product_description: Joi.string().required(),
                product_price: Joi.string().required(),
                product_quantity: Joi.string().required(),
                product_weight: Joi.string().required(),
                product_size: Joi.string().required(),
                product_code: Joi.string().required(),
                product_demos_links: Joi.string().required(),
                productId: Joi.string().required()
            });

            const { error, value } = schema.validate({
                product_name,
                product_category,
                product_sub_category,
                product_description,
                product_price,
                product_quantity,
                product_weight,
                product_size,
                product_code,
                product_demos_links,
                productId
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
                let productName = escape(product_name);
                let productCategory = escape(product_category);
                let productSubCategory = escape(product_sub_category);
                let productDescription = escape(product_description);
                let productPrice = escape(product_price);
                let productQuantity = escape(product_quantity);
                let productWeight = escape(product_weight);
                let productCode = escape(product_code);
                let productSize = escape(product_size);
                let productID = escape(productId);
                let productDemosLinks = escape(product_demos_links);
                // prepare data
                let demos_links = productDemosLinks?.trim();
                // find the product
                const result = await Product.findById(productID);
                // get the product pictures
                const finalResult = JSON.parse(JSON.stringify(result));
                // get the product pictures string[]
                let productPictures = finalResult?.product_pictures ?? [];
                // update the pictures
                const updatedPhotos = [...productPictures, ...filenames];

                let photos = filenames?.length ? updatedPhotos : productPictures;

                const product = await Product.updateOne({ _id: productID }, {
                    product_name: productName,
                    product_category: productCategory,
                    product_sub_category: productSubCategory,
                    product_description: productDescription,
                    product_price: productPrice,
                    product_quantity: productQuantity,
                    product_weight: productWeight,
                    product_size: productSize,
                    product_code: productCode,
                    product_demos_links: demos_links,
                    product_pictures: [...photos]
                });

                if (product.modifiedCount) {
                    // send data as json
                    res.status(200).json({
                        status: "success",
                        data: { product },
                        message: "Product updated"
                    })
                } else {
                    // send data as json
                    res.status(400).json({
                        status: "failed",
                        data: { product },
                        message: "Product update failed"
                    })
                }

            }
        });

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
    updateProduct
}