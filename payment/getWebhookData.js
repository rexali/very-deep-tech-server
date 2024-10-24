// get paystack payment response
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const getWebhookData = async (req, res) => {
    try {
        const secret = process.env.SECRET_KEY;
        if (["52.31.139.75", "52.49.173.169", "52.214.14.220"].includes(req.ip)) {
            const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
            if (hash == req.headers['x-paystack-signature']) {
                const event = req.body;
                // do something with the response like entering the return data to database
                console.log(event);
                res.status(200);
                res.json(event);
            }
        }

    } catch (error) {
        console.warn(error);
    }
}

module.exports = {
    getWebhookData
}