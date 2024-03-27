// Importing necessary modules
import { apiHandler, usersRepo } from 'helpers/api';

// Exporting the default function for handling requests to this route
// The function uses the apiHandler helper function to handle different HTTP methods
// For POST requests, it calls the register function
export default apiHandler({
    post: register
});

// The register function is an asynchronous function that handles user registration
async function register(req, res) {
    // It calls the create method of the usersRepo object, passing the request body
    // The request body should contain the user data
    await usersRepo.create(req.body);
    // After the user is created, it sends a response with a 200 status code and an empty JSON object
    return res.status(200).json({});
}