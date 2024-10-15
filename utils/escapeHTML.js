const { escape } = require("html-escaper");
/**
 * Escape script, html, form, input  and other data
 * @param {string} value - a string of value
 * @returns a string
 */
function escapeHTML(value) {
    try {
    //   ecape the value
        return escape(value);
    } catch (error) {
        console.warn(error);
    }
   
}

module.exports={
   escapeHTML,
}