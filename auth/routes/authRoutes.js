const express = require("express");

const { loginUserHandler } = require("../controllers/loginUserHandler");
const { registerUserHandler } = require("../controllers/registerUserHandler");
const { verifyUserTokenHandler } = require("../controllers/verifyUserTokenHandler");
const { changePassword } = require("../controllers/changePassword");
const { confirmRegistration } = require("../controllers/confirmRegistration");
const { requestPassword } = require("../controllers/requestPassword");
const { isSubdomain } = require("../controllers/isSubdomain");

// initialize authentication router
const authRouter = express.Router();
// login route
authRouter.post("/login", loginUserHandler);
// registeration route
authRouter.post("/register", registerUserHandler);
// verify token route
authRouter.post("/verify", verifyUserTokenHandler);
//change password
authRouter.post("/change", changePassword);
// confirm registration
authRouter.post("/confirm", confirmRegistration);
// forget password
authRouter.post("/forget", requestPassword);
// is-subdomain-availble route
authRouter.get("/", isSubdomain);
// export the authRouter
module.exports = {
    authRouter
}