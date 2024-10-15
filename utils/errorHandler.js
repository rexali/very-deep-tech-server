/**
 * Handle server error
 * @param {object} err - error object
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - callback
 */
function errorHandler(err, req, res, next) {
    try {
        console.error(err.stack);
        // Something broke!;
        res.status(500).json({ error: "Server Error" });
    } catch (error) {
        console.warn(error);
    }

}

module.exports = {
    errorHandler
}