const logMethodMiddleware = (req, res, next) => {
    console.log('Request type: ', req.method);
    next()
}

module.exports = logMethodMiddleware;