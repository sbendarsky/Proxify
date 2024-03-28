// Import necessary modules
import { expressjwt } from 'express-jwt';
import util from 'util';
import getConfig from 'next/config';

// Get server runtime configuration
const { serverRuntimeConfig } = getConfig();

// Export the jwtMiddleware function
export { jwtMiddleware };

// Middleware function for JWT authentication
function jwtMiddleware(req, res) {
    // Create JWT middleware instance with provided secret and algorithms
    const middleware = expressjwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] })
        // Unless specifies paths that don't require authentication
        .unless({
            path: [
                // Public routes that don't require authentication
                '/api/users/register',
                '/api/users/authenticate'
            ]
        });

    // Promisify the middleware function and execute it
    return util.promisify(middleware)(req, res);
}