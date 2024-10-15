const jwt = require("jsonwebtoken");
const { Mutex } = require("async-mutex");

// create mutex instance
const mutex = new Mutex();

/**
 * Check to see if user is an admin
 * @param {object} req - user request object
 * @param {object} res - response to user request
 * @param {object} next - callback function
 * @returns void
 */
async function isAuthenticated(req, res, next) {
       // acquire access to path, lock it to prevent race condition
       const release = await mutex.acquire();
       // get login token from the headers or cookies object
       const token= req.headers.authorization?.split(' ')[1] || req.cookies.token;
       
       try {
              // verify that the token is signed during login
              let decoded = jwt.verify(token, process.env.SECRET_KEY);
              // check userId,email,role are defined in the token
              if (decoded?._id && decoded?.email && decoded?.role && decoded?.role=="user") {
                     // return the verified user data
                    next();
              } else {
                     // return the data if verification fails
                     res.status(404).json({
                            status: "fail",
                            message: "Unauthorised",
                            data: null
                     });
              }

       } catch (error) {
              // return the data if verification fails
              console.log(error);
              res.json({
                     status: "fail",
                     data: null,
                     message: "Unauthorised",
              });
       } finally {
              // release path for other
              release();
       }

}
module.exports = {
       isAuthenticated
}
