// Importing necessary modules
import { apiHandler, usersRepo } from 'helpers/api';

// Exporting the default function for handling requests to this route
// The function uses the apiHandler helper function to handle different HTTP methods
// For GET requests, it calls the getAll function
export default apiHandler({
    get: getAll
});

// The getAll function is an asynchronous function that retrieves all users
async function getAll(req, res) {
    // It calls the getAll method of the usersRepo object to retrieve all users
    const users = await usersRepo.getAll();
    // After retrieving the users, it sends a response with a 200 status code and the users as JSON
    return res.status(200).json(users);
}