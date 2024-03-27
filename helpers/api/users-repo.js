import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';

// Get server runtime configuration
const { serverRuntimeConfig } = getConfig();
// Get User model from the database
const User = db.User;

// Exporting the usersRepo object that contains all the user related methods
export const usersRepo = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// Function to authenticate a user
async function authenticate({ username, password }) {
    // Find the user with the provided username
    const user = await User.findOne({ username });

    // If the user is not found or the password is incorrect, throw an error
    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'Username or password is incorrect';
    }

    // Create a JWT token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    // Return the user and the token
    return {
        ...user.toJSON(),
        token
    };
}

// Function to get all users
async function getAll() {
    return await User.find();
}

// Function to get a user by ID
async function getById(id) {
    return await User.findById(id);
}

// Function to create a new user
async function create(params) {
    // Validate if the username is already taken
    if (await User.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // Create a new user object
    const user = new User(params);

    // Hash the password if it is provided
    if (params.password) {
        user.hash = bcrypt.hashSync(params.password, 10);
    }

    // Save the user to the database
    await user.save();
}

// Function to update a user
async function update(id, params) {
    // Find the user by ID
    const user = await User.findById(id);

    // Validate if the user is found and if the username is already taken
    if (!user) throw 'User not found';
    if (user.username !== params.username && await User.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // Hash the password if it is provided
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    // Copy the params properties to the user
    Object.assign(user, params);

    // Save the user to the database
    await user.save();
}

// Function to delete a user
async function _delete(id) {
    await User.findByIdAndRemove(id);
}