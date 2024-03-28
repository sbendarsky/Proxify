// Importing helper functions
import { errorHandler, jwtMiddleware } from 'helpers/api';

// Exporting apiHandler function
export { apiHandler };

// apiHandler function definition
function apiHandler(handler) {
    // Returning an async function that takes req, res as parameters
    return async (req, res) => {
        // Extracting HTTP method from request
        const method = req.method.toLowerCase();

        // Check if the handler supports the HTTP method
        if (!handler[method])
            return res.status(405).end(`Method ${req.method} Not Allowed`);

        try {
            // Applying global middleware (JWT middleware)
            await jwtMiddleware(req, res);

            // Calling the appropriate handler method based on the HTTP method
            await handler[method](req, res);
        } catch (err) {
            // Handling errors using global error handler
            errorHandler(err, res);
        }
    }
}