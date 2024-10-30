// import required modules
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require('dotenv');
// initiatize the .env
dotenv.config();
// import error and log handlers
const { logHandler } = require("./utils/logHandler");
const { errorHandler } = require("./utils/errorHandler");
// handle payment
const { getTransactionUrl } = require("./payment/getTransactionUrl");
const { verifyTransaction } = require("./payment/verifyTransaction");
const { getWebhookData } = require("./payment/getWebhookData");
// import auth and admin routes
const { authRouter } = require("./auth/routes/authRoutes");
const { profileRouter } = require("./profiles/routes/profileRoutes");
const { productRouter } = require("./products/routes/product.routes");
const { cartRouter } = require("./carts/routes/cart.routes");
const { searchProducts } = require("./products/controllers/searchProducts");
const { searchProductsByCategory } = require("./products/controllers/searchProductsByCategory");
const { subscriptionRouter } = require("./subscriptions/routes/subscription.Routes");
const { messageRouter } = require("./messages/routes/messageRoutes");
const { notificationRouter } = require("./notifications/routes/notificationRoutes");
const { ratingRouter } = require("./ratings/routes/ratingRoutes");
const { transactionRouter } = require("./transactions/routes/transaction.routes");
const { orderRouter } = require("./orders/routes/order.routes");
const { favouriteRouter } = require("./favourites/routes/favourite.routes");
// instantiate express
const app = express();
// port
const PORT = process.env.PORT || 4002;
// host
const HOST = "localhost";
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse cookies
app.use(cookieParser());
// apply default cors to the server 
app.use(cors());
// set view engine
app.set('view engine', 'ejs');
// set views
app.set('views', 'views');
// get error 
app.use(errorHandler);
//log request info in the console
app.use(logHandler);
// add auth, profile routes etc
app.use("/auth", authRouter);
app.use("/profiles", profileRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/search", searchProducts);
app.use("/category", searchProductsByCategory);
app.use("/subscriptions",subscriptionRouter);
app.use("/messages",messageRouter);
app.use("/notifications",notificationRouter);
app.use('/ratings',ratingRouter);
app.use('/transactions',transactionRouter);
app.use('/orders',orderRouter);
app.use('/favourites',favouriteRouter);

// server home
app.get("/", async (req, res) => {
    try {
        // render home page
        res.render("home", {});
    } catch (error) {
        // catch error
        console.warn(error);
        res.status(500).json({
            status: "fail",
            data: null,
            message: "Internal server error"
        });
    }
});

// server home
app.get("/health", async (req, res) => {
    res.send("I am fine");
});
// get paystack webhook response
app.post("/webhook-server", getWebhookData);
// verify paystack transaction
app.post('/verify_transaction', verifyTransaction);
// get paystack transaction url
app.post('/get_trasaction_url', getTransactionUrl);
// catch not-found resources
app.use((req, res) => {
    try {
        // return json
        res.status(404).json({
            status: "fail",
            data: null,
            message: "page not found"
        });
        // catch error
    } catch (error) {
        // log error
        console.warn(error);
        res.status(500).json({
            status: "fail",
            data: null,
            message: "Internal server error"
        });
    }
});
// listent to server  
const server = app.listen(PORT, () => {
    // log to the console
    console.log(`The server is listening at port ${PORT} !!!`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000

// make app object available to the whole application for test
// module.exports = app;

