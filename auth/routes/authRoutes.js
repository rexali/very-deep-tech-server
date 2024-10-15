const express = require("express");
const passport = require("../../config/passport")

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
// google route
authRouter.get(
    '/login/google',
    passport.authenticate('google', { scope: ['profile'] })
);
// google redirect route
authRouter.get(
    '/oauth2/redirect/google',
    passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        // Successful authentication, redirect home.
        // res.redirect('/');
        res.status(200).json({ status: "success", data: { result: true }, message: "login successful" })
    }
);
// export the authRouter
module.exports = {
    authRouter
}