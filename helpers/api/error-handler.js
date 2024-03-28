// Exporting errorHandler function
export { errorHandler };

// Function to handle errors
function errorHandler(err, res) {
    // Check if error is a string
    if (typeof (err) === 'string') {
        // Custom application error
        const is404 = err.toLowerCase().endsWith('not found');
        // Determine status code based on whether it's a 404 error or a general error
        const statusCode = is404 ? 404 : 400;
        // Send JSON response with error message and status code
        return res.status(statusCode).json({ message: err });
    }

    // Check if error is an UnauthorizedError (JWT authentication error)
    if (err.name === 'UnauthorizedError') {
        // JWT authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // Default to 500 server error if no specific error handling is provided
    console.error(err); // Log the error for debugging purposes
    // Send JSON response with error message and status code 500
    return res.status(500).json({ message: err.message });
}