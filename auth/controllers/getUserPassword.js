const { Mutex } = require("async-mutex");
const { User } = require("../models/user.model");

// create mutex instance
const mutex = new Mutex();

/**
 * Get user password from database
 * @param {string} sql - a string of sql statement 
 * @param {Array} esc - an array of sql statement input
 * @returns void
 */
async function getUserPassword(email) {
  // acquire access to the path to do operation (for race condition)
  const release = await mutex.acquire();
  try {
    const result = await User.findOne({ email: email });
    // retrieve the password
    let { password } = result;
    
    return password;
    // catch error
  } catch (error) {
    // log error
    console.warn(error);
  } finally {
    // release path for other
    release();
  }
}


module.exports = {
  getUserPassword
}