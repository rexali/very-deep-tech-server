const express = require("express");

const { getProfile } = require("./getProfile");
const { updateProfile } = require("./updateProfile");
const { deleteProfile } = require("./deleteProfile");
const { isAuthenticated } = require("../auth/isAuthenticated");
const { getProfiles } = require("./getProfiles");

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