const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { deleteUserFavourite } = require("../controllers/deteteUserFavourite");
const { getUserFavourites } = require("../controllers/getUserFavourites");
const { createFavourite } = require("../controllers/createFavourite");

// initialize favourite router
const favouriteRouter = express.Router();

// add favourite products
favouriteRouter.post(
    '/',
    // isAuthenticated, 
    createFavourite
);

// get all favourite products
favouriteRouter.get(
    '/',
    // isAuthenticated,
    getUserFavourites
);

// get user favourite and products
favouriteRouter.get(
    '/:id/users',
    // isAuthenticated,
    getUserFavourites
);

// delete a favourite
favouriteRouter.delete(
    "/:productId/users/:userId",
    // isAuthenticated,
    deleteUserFavourite
);
// export favourite router
module.exports = {
    favouriteRouter
}