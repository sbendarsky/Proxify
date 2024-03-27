// Importing necessary modules
import { expressjwt } from 'express-jwt';
import util from 'util';
import getConfig from 'next/config';

// Getting server runtime configuration
const { serverRuntimeConfig } = getConfig();

// Exporting the jwtMiddleware function
export { jwtMiddleware };

// jwtMiddleware is a function that takes a request and a response
// It uses express-jwt to validate JWTs in the Authorization header of the request
// It allows certain public routes to bypass this validation
function jwtMiddleware(req, res) {
    // Creating a middleware with express-jwt
    // It uses the secret from the server runtime configuration and the HS256 algorithm
    // It does not apply to the paths in the unless clause
    const middleware = expressjwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/register',
            '/api/users/authenticate'
        ]
    });

    // Promisify the middleware and return it
    // This allows the middleware to be used with async/await
    return util.promisify(middleware)(req, res);
}