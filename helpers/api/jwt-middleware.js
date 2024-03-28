// Import necessary modules
import { expressjwt } from 'express-jwt';
import util from 'util';
import getConfig from 'next/config';

// Get server runtime configuration from Next.js
const { serverRuntimeConfig } = getConfig();

// Export jwtMiddleware function
export { jwtMiddleware };

function jwtMiddleware(req, res) {
    // Create JWT middleware with provided secret and algorithms, and exclude certain paths from authentication
    const middleware = expressjwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
        path: [
            // Public routes that don't require authentication
            '/api/users/register',
            '/api/users/authenticate'
        ]
    });

    // Promisify the middleware function and return
    return util.promisify(middleware)(req, res);
}      