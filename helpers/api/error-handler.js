// Exporting the errorHandler function
export { errorHandler };

// errorHandler is a function that takes an error and a response object
// It checks the type of the error and sends an appropriate HTTP response
function errorHandler(err, res) {
    // If the error is a string, it's a custom application error
    if (typeof (err) === 'string') {
        // Check if the error message ends with 'not found'
        // If it does, it's a 404 error, otherwise it's a 400 error
        const is404 = err.toLowerCase().endsWith('not found');
        const statusCode = is404 ? 404 : 400;
        // Send the error message in the response with the appropriate status code
        return res.status(statusCode).json({ message: err });
    }

    // If the error name is 'UnauthorizedError', it's a JWT authentication error
    if (err.name === 'UnauthorizedError') {
        // Send a 401 response with the message 'Invalid Token'
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // If it's none of the above, it's a server error
    // Log the error and send a 500 response with the error message
    console.error(err);
    return res.status(500).json({ message: err.message });
}