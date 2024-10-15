const express = require("express");

const { getProfile } = require("../controllers/getProfile");
const { updateProfile } = require("../controllers/updateProfile");
const { deleteProfile } = require("../controllers/deleteProfile");
const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { getProfiles } = require("../controllers/getProfiles");

// initialize admin router
const profileRouter = express.Router();
// get a profile
profileRouter.get(
    '/:id',
    isAuthenticated, 
    getProfile
);
// get all user profiles
profileRouter.get(
    '/',
    isAuthenticated,
    getProfiles
);
// update a profile
profileRouter.patch(
    "/",
    isAuthenticated,
    updateProfile
);
// delete a profile
profileRouter.delete(
    "/",
    isAuthenticated,
    deleteProfile
);
// export profile router
module.exports = {
    profileRouter
}