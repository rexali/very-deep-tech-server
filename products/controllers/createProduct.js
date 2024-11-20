const { Product } = require("../models/product.model");
const { uploadMultipleFiles } =require("../../utils/uploadFile");
const multer =require("multer");
const { getFilesNames } =require("../utils/getFilesNames");


/**
 * Create a product
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns void
 */
const createProduct = async (req, res) => {

    // try {
        // retrieve the request body data
        // const {
        //     product_name,
        //     product_picture,
        //     product_category,
        //     product_sub_category,
        //     product_description,
        //     product_price, 
        //     product_quantity,
        //     product_weight,
        //     product_size,
        //     product_code,
        //     product_demos_links,
        //     product_photos_links,
        //     user_id
        // } = req.body;
    

    uploadMultipleFiles('product_pictures')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            throw new Error(err.message)
        } else if (err) {
            // An unknown error occurred when uploading.
            throw new Error(err)
        };
        // Everything went fine, send the file name and other fields to database
        try {
            const data = {
                ...req.body,
                product_pictures: getFilesNames(req.files)
            }
            // save in database
            const product = await Product.create({
                // product_name,
                // product_picture,
                // product_category,
                // product_sub_category,
                // product_description,
                // product_price,
                // product_quantity,
                // product_weight,
                // product_size,
                // product_code,
                // user: user_id
                ...data
            });
           
            if (product !== null) {
                // send data as json
                res.status(200).json({
                    status: "success",
                    data: { product },
                    message: "Product created"
                })
    
            } else {
                // send data as json
                res.status(400).json({
                    status: "success",
                    data: { product },
                    message: "Product creation failed"
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

    });

    //     const product = await Product.create({
    //         product_name,
    //         product_picture,
    //         product_category,
    //         product_sub_category,
    //         product_description,
    //         product_price,
    //         product_quantity,
    //         product_weight,
    //         product_size,
    //         product_code,
    //         user: user_id
    //     });

    //     if (product !== null) {
    //         // send data as json
    //         res.status(200).json({
    //             status: "success",
    //             data: { product },
    //             message: "Product created"
    //         })

    //     } else {
    //         // send data as json
    //         res.status(400).json({
    //             status: "success",
    //             data: { product },
    //             message: "Product creation failed"
    //         })
    //     }

    // } catch (error) {
    //     console.warn(error);
    //     // send data as json
    //     res.status(500).json({
    //         status: "failed",
    //         data: result,
    //         message: "Error! " + error.message

    //     })
    //  }

};

module.exports = {
    createProduct
}