// Importing necessary modules
import { apiHandler, usersRepo } from 'helpers/api';

// Exporting the default function for handling requests to this route
// The function uses the apiHandler helper function to handle different HTTP methods
// For POST requests, it calls the authenticate function
export default apiHandler({
    post: authenticate
});

// The authenticate function is an asynchronous function that handles user authentication
async function authenticate(req, res) {
    // It calls the authenticate method of the usersRepo object, passing the request body
    // The request body should contain the user credentials
    const user = await usersRepo.authenticate(req.body);
    // After authenticating the user, it sends a response with a 200 status code and the user data as JSON
    return res.status(200).json(user);
}