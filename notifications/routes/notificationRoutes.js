const express = require("express");

const { updateNotification } = require("../controllers/updateNotification");
const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { getNotifications } = require("../controllers/getNotifications");
const { getNotification } = require("../controllers/getNotification");
const { deleteNotification } = require("../controllers/deleteNotification");
const { createNotification } = require("../controllers/createNotification");

// initialize admin router
const notificationRouter = express.Router();
// get a notification
notificationRouter.get(
    '/:id',
    // isAuthenticated, 
    getNotification
);
// get all notifications
notificationRouter.get(
    '/', 
    // isAuthenticated,
    getNotifications
);
// update a notification
notificationRouter.post(
    "/",
    // isAuthenticated,
    createNotification
);
// update a notification
notificationRouter.patch(
    "/",
    // isAuthenticated,
    updateNotification
);
// delete a notification
notificationRouter.delete(
    "/",
    // isAuthenticated,
    deleteNotification
);
// export notification router
module.exports = {
    notificationRouter
}