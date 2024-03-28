// Import necessary modules
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';

// Get server runtime configuration from Next.js
const { serverRuntimeConfig } = getConfig();

// Extract User model from the database
const User = db.User;

// Export usersRepo object containing various user-related functions
export const usersRepo = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists and if the password matches
    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'Username or password is incorrect';
    }

    // Create a JWT token valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    return {
        ...user.toJSON(),
        token
    };
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function create(params) {
    // Validate if username is already taken
    if (await User.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    const user = new User(params);

    // Hash password if provided
    if (params.password) {
        user.hash = bcrypt.hashSync(params.password, 10);
    }

    // Save the user
    await user.save();
}

async function update(id, params) {
    const user = await User.findById(id);

    // Validate if user exists
    if (!user) throw 'User not found';

    // Validate if new username is already taken
    if (user.username !== params.username && await User.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // Hash password if provided
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    // Update user properties
    Object.assign(user, params);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
