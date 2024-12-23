const { Mutex } = require("async-mutex");
const { User } = require("../models/user.model");


// create mutex instance
const mutex = new Mutex();

/**
 * Check user email during forget operation
 * @param {string} sql - a string of sql statement
 * @param {object} esc - array of sql string input
 * @returns boolean if user email exists
 */
async function isUserEmail(email, rcode) {
  // acquire path
  const release = await mutex.acquire();
  try {
    let result = User.findOne({ email, rcode });
    if (Object.keys(result).length && result.email) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.warn(error);
  } finally {
    // release path for other
    release()
  }

}

module.exports = {
  isUserEmail
}