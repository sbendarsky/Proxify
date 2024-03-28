import { errorHandler, jwtMiddleware } from 'helpers/api';

// Exporting the apiHandler function
export { apiHandler };

/**
 * Middleware function for handling API requests.
 * @param {object} handler - An object containing methods for different HTTP request types (e.g., GET, POST, etc.).
 * @returns {Function} - Middleware function to handle API requests.
 */
function apiHandler(handler) {
    return async (req, res) => {
        const method = req.method.toLowerCase();

        // Check if the handler supports the HTTP method
        if (!handler[method])
            return res.status(405).end(`Method ${req.method} Not Allowed`);

        try {
            // Apply global middleware for JWT authentication
            await jwtMiddleware(req, res);

            // Call the appropriate route handler based on the HTTP method
            await handler[method](req, res);
        } catch (err) {
            // Handle errors using the global error handler
            errorHandler(err, res);
        }
    }
}
