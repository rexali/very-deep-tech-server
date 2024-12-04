const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { deleteUserFavourite } = require("../controllers/deteteUserFavourite");
const { getUserFavourites } = require("../controllers/getUserFavourites");
const { createFavourite } = require("../controllers/createFavourite");
const { getFavourites } = require("../controllers/getFavourites");
const { getFavourite } = require("../controllers/getFavourite");
const { getUserFavouritex } = require("../controllers/getUserFavouritex");

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
    getFavourites
);

// get a favourite
favouriteRouter.get(
    '/:id',
    // isAuthenticated,
    getFavourite
);

// get user favourites
favouriteRouter.get(
    '/users/:userId/pages/:page',
    // isAuthenticated,
    getUserFavourites
);

// get all user favourites without page 
favouriteRouter.get(
    '/users/:userId',
    // isAuthenticated,
    getUserFavouritex
);

// delete a favourite
favouriteRouter.delete(
    "/products/:productId/users/:userId",
    // isAuthenticated,
    deleteUserFavourite
);
// export favourite router
module.exports = {
    favouriteRouter
}