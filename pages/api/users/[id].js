// Importing necessary modules
import { apiHandler, usersRepo } from 'helpers/api';

// Exporting the default function for handling requests to this route
// The function uses the apiHandler helper function to handle different HTTP methods
// For GET requests, it calls the getById function
// For PUT requests, it calls the update function
// For DELETE requests, it calls the _delete function
export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

// The getById function is an asynchronous function that retrieves a user by ID
async function getById(req, res) {
    // It calls the getById method of the usersRepo object, passing the ID from the request query
    const user = await usersRepo.getById(req.query.id);

    // If the user is not found, it throws an error
    if (!user) throw 'User Not Found';

    // After retrieving the user, it sends a response with a 200 status code and the user data as JSON
    return res.status(200).json(user);
}

// The update function is an asynchronous function that updates a user
async function update(req, res) {
    // It calls the update method of the usersRepo object, passing the ID from the request query and the request body
    // The request body should contain the updated user data
    await usersRepo.update(req.query.id, req.body);

    // After updating the user, it sends a response with a 200 status code and an empty JSON object
    return res.status(200).json({});
}

// The _delete function is an asynchronous function that deletes a user
async function _delete(req, res) {
    // It calls the delete method of the usersRepo object, passing the ID from the request query
    await usersRepo.delete(req.query.id);

    // After deleting the user, it sends a response with a 200 status code and an empty JSON object
    return res.status(200).json({});
}