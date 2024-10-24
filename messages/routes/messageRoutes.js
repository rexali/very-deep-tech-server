const express = require("express");

const { isAuthenticated } = require("../../auth/controllers/isAuthenticated");
const { deleteMessage } = require("../controllers/deleteMessage");
const { getMessage } = require("../controllers/getMessage");
const { getMessages } = require("../controllers/getMessages");
const { updateMessage } = require("../controllers/updateMessage");

// initialize admin router
const messageRouter = express.Router();
// get a message
messageRouter.get(
    '/:id',
    isAuthenticated, 
    getMessage
); 
// get all messages
messageRouter.get(
    '/',
    isAuthenticated,
    getMessages
);
// update a message
messageRouter.patch(
    "/",
    isAuthenticated,
    updateMessage
);
// delete a message
messageRouter.delete(
    "/",
    isAuthenticated,
    deleteMessage
);
// export message router
module.exports = {
    messageRouter 
}