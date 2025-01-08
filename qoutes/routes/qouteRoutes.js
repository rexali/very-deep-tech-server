const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const {  getQoutes } = require("../controllers/getQoutes");
const { createQoute } = require("../controllers/createQoute");
const { getQoute } = require("../controllers/getQoute");

// initialize admin router
const qouteRouter = express.Router();

// get all qoutes
qouteRouter.get(
    '/:id',
    // isAuthenticated, 
    getQoute
);

// get all qoutes
qouteRouter.get(
    '/',
    // isAuthenticated, 
    getQoutes
);
// create a qoute
qouteRouter.post(
    "/",
    // isAuthenticated,
    createQoute
);

// export qoute router
module.exports = {
    qouteRouter 
}