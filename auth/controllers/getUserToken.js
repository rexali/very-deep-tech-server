const jsonwebtoken = require("jsonwebtoken");
const { Mutex } = require("async-mutex");
const { User } = require("../models/user.model");

// create mutex instance
const mutex = new Mutex();
/**
 * Create authentication token for a user 
 * @param {String} sql - a string of sql
 * @param {Array} esc - an array of arguments
 * @param {Object} res - request object
 * @returns token
 */
async function getUserToken(userEmail) {
  // acquire access to the path to do operation (for race condition)
  const release = await mutex.acquire();
  try {
    const result = await User.findOne({ email: userEmail });
    // get userId, email and role by destructing
    const { _id, email, role } = result;
    // get the secret key
    const jwtSecret = process.env.SECRET_KEY;
    // sign the token which expires after 24 hours 
    const token = jsonwebtoken.sign({ _id, email, role }, jwtSecret, { noTimestamp: true, expiresIn: '24h' }
    );
    // return promise
    return token
    // catch error
  } catch (error) {
    // log error
    console.log(error);
  } finally {
    // release path for other
    release();
  }

}

module.exports = {
  getUserToken
}