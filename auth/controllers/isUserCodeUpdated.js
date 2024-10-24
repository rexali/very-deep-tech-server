const {Mutex} = require('async-mutex');
const { User } = require("../models/user.model");


// mutex instance
const mutex = new Mutex();

/**
 * Update the user random code
 * @param {String} sql sql query string 
 * @param {String[]} esc  parameters to be escaped in query string
 * @returns boolean promise
 */
async function isUserCodeUpdated(email, rcode) {
  // acquire access to path to perform operation to avoid race condition
  const release = await mutex.acquire();
  try {
       
        let result = await User.updateOne({email},{rcode});
    
        if (result.modifiedCount == 1) {
  
          return true;
        } else {
  
          return false;
        }
    
  } catch (error) {
    console.warn(error);
  }finally{
    // release path for other operation
    release();
  }
 
}

module.exports = {
  isUserCodeUpdated
}