const loggerTwo = (req, res, next) => {
    console.log('Log 2');
    next();
}

module.exports = loggerTwo