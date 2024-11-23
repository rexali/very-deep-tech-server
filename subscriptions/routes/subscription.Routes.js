const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { updateSubscription } = require("../controllers/updateSubscription");
const { deleteSubscription } = require("../controllers/deleteSubscription");
const { getSubscriptions } = require("../controllers/getSubscriptions");
const { createSubscription } = require("../controllers/createSubscription");

// initialize admin router
const subscriptionRouter = express.Router();
// create a subscription
subscriptionRouter.post(
    '/',
    // isAuthenticated,
    createSubscription
);
// get all subscription
subscriptionRouter.get(
    '/',
    // isAuthenticated,
    getSubscriptions
);
// update a subscription
subscriptionRouter.patch(
    "/",
    // isAuthenticated,
    updateSubscription
);
// delete a subscription
subscriptionRouter.delete(
    "/",
    // isAuthenticated,
    deleteSubscription
);
// export subscription router
module.exports = {
    subscriptionRouter
}