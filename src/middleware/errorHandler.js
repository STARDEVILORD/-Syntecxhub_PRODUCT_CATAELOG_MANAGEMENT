const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        return res.status(404).json({ success: false, error: 'Resource not found' });
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        return res.status(400).json({ success: false, error: 'Duplicate field value entered' });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    });
};

module.exports = errorHandler;