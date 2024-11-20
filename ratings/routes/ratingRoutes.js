const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { createRating } = require("../controllers/createRating");
const { getRating } = require("../controllers/getRating");
const { updateRating } = require("../controllers/updateRating");
const { deleteRating } = require("../controllers/deleteRating");

// initialize rating router
const ratingRouter = express.Router();
// get a rating
ratingRouter.get(
    '/:id',
    isAuthenticated, 
    getRating
);
// create a rating
ratingRouter.post(
    '/', 
    isAuthenticated,
    createRating
);
// update a rating
ratingRouter.patch(
    "/",
    isAuthenticated,
    updateRating
);
// delete a rating
ratingRouter.delete(
    "/",
    isAuthenticated,
    deleteRating
);
// export rating router
module.exports = {
    ratingRouter
}