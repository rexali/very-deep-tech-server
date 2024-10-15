/**
 * Log client request with time
 * @param {object} err - error object
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - callback
 */
function logHandler(req, res, next) {
    try {
        const method = req.method;
        const url = req.originalUrl;
        req.timeReceived = Date();
        console.log(`${method}: ${url} --- ${req.timeReceived}`);
        next();
    } catch (error) {
        console.warn(error);
    }

}

module.exports = {
    logHandler
}