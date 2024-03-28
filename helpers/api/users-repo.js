// Import necessary modules
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';

// Get server runtime configuration
const { serverRuntimeConfig } = getConfig();

// Get the User model from the database
const User = db.User;

// Export usersRepo object containing repository functions
export const usersRepo = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// Authenticate user based on provided username and password
async function authenticate({ username, password }) {
    // Find user in the database by username
    const user = await User.findOne({ username });

    // If user is not found or password doesn't match, throw an error
    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'Username or password is incorrect';
    }

    // Create a JWT token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    // Return user details along with the token
    return {
        ...user.toJSON(),
        token
    };
}

// Retrieve all users from the database
async function getAll() {
    return await User.find();
}

// Retrieve user by ID from the database
async function getById(id) {
    return await User.findById(id);
}

// Create a new user in the database
async function create(params) {
    // Check if the username is already taken
    if (await User.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // Create a new user instance with provided parameters
    const user = new User(params);

    // Hash the password if provided
    if (params.password) {
        user.hash = bcrypt.hashSync(params.password, 10);
    }

    // Save the user to the database
    await user.save();
}

// Update user details in the database
async function update(id, params) {
    // Find user by ID
    const user = await User.findById(id);

    // Check if user exists
    if (!user) throw 'User not found';

    // Check if the new username is already taken
    if (user.username !== params.username && await User.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // Hash the password if provided
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    // Update user properties
    Object.assign(user, params);

    // Save the updated user
    await user.save();
}

// Delete user from the database by ID
async function _delete(id) {
    await User.findByIdAndRemove(id);
}