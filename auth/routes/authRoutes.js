const express = require("express");

const { loginUserHandler } = require("../controllers/loginUserHandler");
const { registerUserHandler } = require("../controllers/registerUserHandler");
const { verifyUserTokenHandler } = require("../controllers/verifyUserTokenHandler");

// initialize authentication router
const authRouter = express.Router();
// login route
authRouter.post("/login", loginUserHandler);
// registeration route
authRouter.post("/register", registerUserHandler);
// verify token route
authRouter.post("/verify", verifyUserTokenHandler);
// export the authRouter
module.exports = {
    authRouter
}