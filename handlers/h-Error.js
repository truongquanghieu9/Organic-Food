exports.handle = (err, req, res, next) => {
    return res.status(err.status || 500).json({
        errorMsg: err.message || "Oops! Something went wrong!"
    })
}
