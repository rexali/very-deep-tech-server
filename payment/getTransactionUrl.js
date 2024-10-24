const { default: axios } = require("axios");
const dotenv = require('dotenv');
dotenv.config();

const getTransactionUrl = async (req, res) => {
    try {
        const { amount, email } = req.body;
        let { data } = await axios.post(`https://api.paystack.co/transaction/initialize`, {
             amount, 
             email, 
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.SECRET,
            }
        });

        res.json(data)
    } catch (error) {
        console.warn(error);
    }
}

module.exports = {
    getTransactionUrl
}