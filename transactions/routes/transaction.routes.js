const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { getTransaction } = require("../controllers/getTransaction");
const { getTransactions } = require("../controllers/getTransactions");
const { getUserTransactions } = require("../controllers/getUserTransaction");
const { createTransaction } = require("../controllers/createTransaction");

// initialize transaction router
const transactionRouter = express.Router();

// get all transaction
transactionRouter.get(
    '/:id',
    // isAuthenticated,
    getTransaction 
);
// get all transaction and products
transactionRouter.get( 
    '/',
    // isAuthenticated,
    getTransactions
);

// get user transaction and products
transactionRouter.get( 
    '/:id/users',
    // isAuthenticated,
    getUserTransactions
);

// create a transaction
transactionRouter.post(
    "/",
    // isAuthenticated,
    createTransaction
);

// export transaction router
module.exports = {
    transactionRouter
}