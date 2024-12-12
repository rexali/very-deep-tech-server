const { uploadMultipleFiles } = require("../../utils/uploadFile");
const { Product } = require("../models/product.model");
const multer = require("multer");
var fs = require('fs/promises');
const { getFilesNames } = require("../utils/getFilesNames");

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
            let filenames = getFilesNames([...req.files]);

            // retrieve the request body data
            const {
                productId,
                product_photos,
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
                product_photos_links
            } = req.body;
            // prepare data
            let productphotos = product_photos?.split(',').map(link => link.trim()).filter(link => link != '')
            let photos_links = product_photos_links?.split(',').map(link => link.trim()).filter(link => link != '').join(',')
            let demos_links = product_demos_links?.trim();
            // remove file
            productphotos?.forEach(async photo => {
                try {
                    const res = await fs.unlink(process.cwd(), 'public/uploads/' + photo);
                } catch (error) {
                    console.warn(error);
                    // send data as json
                    res.status(500).json({
                        status: "failed",
                        data: null,
                        message: "Error! " + error.message
                    })
                }

            });
            // update
            const product = await Product.updateOne(
                { _id: productId },
                {
                    product_name,
                    product_category,
                    product_sub_category,
                    product_description,
                    product_price,
                    product_quantity,
                    product_weight,
                    product_size,
                    product_code,
                    product_demos_links: demos_links,
                    product_photos_links: photos_links,
                    product_pictures: [...filenames]
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