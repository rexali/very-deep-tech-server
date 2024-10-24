const { default: axios } = require("axios");
const dotenv = require('dotenv');
dotenv.config();

const verifyTransaction = async (req, res) => {
    // call paystack verify transaction api
    try {
         const { reference } = req.body
         const { data } = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
              headers: {
                   'Authorization': 'Bearer ' + process.env.SECRET_KEY
              }
         });
         console.log(data);
         res.json({ success: data.data.success })
    } catch (error) {
         console.warn(error);
    }
}

module.exports={
    verifyTransaction
}