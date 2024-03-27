import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';
import { alertService } from './alert.service';

// Getting the public runtime configuration
const { publicRuntimeConfig } = getConfig();
// Setting the base URL for the API
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
// Creating a BehaviorSubject for the user
// The initial value is retrieved from local storage
const userSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')));

// Exporting the userService object
export const userService = {
    user: userSubject.asObservable(), // The user as an observable
    get userValue() { return userSubject.value }, // The current value of the user
    login, // Function to log in a user
    logout, // Function to log out a user
    register, // Function to register a user
    getAll, // Function to get all users
    getById, // Function to get a user by ID
    update, // Function to update a user
    delete: _delete // Function to delete a user
};

// Function to log in a user
async function login(username, password) {
    const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });

    // Publish user to subscribers and store in local storage to stay logged in between page refreshes
    userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
}

// Function to log out a user
function logout() {
    alertService.clear();
    // Remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}

// Function to register a user
async function register(user) {
    await fetchWrapper.post(`${baseUrl}/register`, user);
}

// Function to get all users
async function getAll() {
    return await fetchWrapper.get(baseUrl);
}

// Function to get a user by ID
async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

// Function to update a user
async function update(id, params) {
    await fetchWrapper.put(`${baseUrl}/${id}`, params);

    // Update stored user if the logged in user updated their own record
    if (id === userSubject.value.id) {
        // Update local storage
        const user = { ...userSubject.value, ...params };
        localStorage.setItem('user', JSON.stringify(user));

        // Publish updated user to subscribers
        userSubject.next(user);
    }
}

// Function to delete a user
// Prefixed with underscore because delete is a reserved word in JavaScript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);

    // Auto logout if the logged in user deleted their own record
    if (id === userSubject.value.id) {
        logout();
    }
}