const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { deleteUserFavourite } = require("../controllers/deteteUserFavourite");
const { getUserFavourites } = require("../controllers/getUserFavourites");
const { createFavourite } = require("../controllers/createFavourite");

// initialize favourite router
const favouriteRouter = express.Router();

// get all favourite and products
favouriteRouter.post(
    '/',
    // isAuthenticated, 
    createFavourite
);

// get user favourite and products
favouriteRouter.get( 
    '/:id',
    // isAuthenticated,
    getUserFavourites
);

// delete a favourite
favouriteRouter.delete(
    "/:id/users",
    // isAuthenticated,
    deleteUserFavourite
);
// export favourite router
module.exports = {
    favouriteRouter
}