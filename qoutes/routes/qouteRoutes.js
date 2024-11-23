const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const {  getQoutes } = require("../controllers/getQoutes");
const { createQoute } = require("../controllers/createQoute");

// initialize admin router
const qouteRouter = express.Router();

// get all qoutes
qouteRouter.get(
    '/:id',
    // isAuthenticated, 
    getQoutes
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