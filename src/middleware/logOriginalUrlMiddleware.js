const logOriginalUrlMiddleware = (req, res, next) => {
    console.log('Request URL (originalUrl): ', req.url);
    next()
}

module.exports = logOriginalUrlMiddleware;