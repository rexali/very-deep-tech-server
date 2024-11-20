const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { getMessages, getQoutes } = require("../controllers/getQoutes");
const { createQoute } = require("../controllers/createQoute");

// initialize admin router
const qouteRouter = express.Router();

// get all messages
qouteRouter.get(
    '/',
    // isAuthenticated,
    getQoutes
);
// update a message
qouteRouter.post(
    "/",
    // isAuthenticated,
    createQoute
);

// export message router
module.exports = {
    qouteRouter 
}