export { errorHandler };

function errorHandler(err, res) {
    // Check if the error is a string (custom application error)
    if (typeof (err) === 'string') {
        // Custom application error: Check if the error message indicates a 'not found' error
        const is404 = err.toLowerCase().endsWith('not found');
        // Determine the appropriate status code based on whether it's a 404 error or not
        const statusCode = is404 ? 404 : 400;
        // Return a JSON response with the appropriate status code and error message
        return res.status(statusCode).json({ message: err });
    }

    // Check if the error is an 'UnauthorizedError' (JWT authentication error)
    if (err.name === 'UnauthorizedError') {
        // Return a JSON response with a 401 status code and 'Invalid Token' message
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // Default to a 500 server error for other types of errors
    // Log the error to the console
    console.error(err);
    // Return a JSON response with a 500 status code and the error message from the error object
    return res.status(500).json({ message: err.message });
}