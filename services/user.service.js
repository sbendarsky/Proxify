import { BehaviorSubject } from 'rxjs'; // Import BehaviorSubject from RxJS library
import getConfig from 'next/config'; // Import getConfig function from Next.js config
import Router from 'next/router'; // Import Router from Next.js
import { fetchWrapper } from 'helpers'; // Import fetchWrapper from helpers module
import { alertService } from './alert.service'; // Import alertService from alert.service module

// Retrieve publicRuntimeConfig from Next.js config
const { publicRuntimeConfig } = getConfig();

// Construct base URL for user API endpoints using publicRuntimeConfig
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

// Initialize a BehaviorSubject to manage user state
const userSubject = new BehaviorSubject(
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user'))
);

// Expose methods to interact with the user service
export const userService = {
    user: userSubject.asObservable(), // Observable for subscribing to user changes
    get userValue() { return userSubject.value }, // Getter to get current user value
    login, // Method to log in user
    logout, // Method to log out user
    register, // Method to register a new user
    getAll, // Method to get all users
    getById, // Method to get user by ID
    update, // Method to update user information
    delete: _delete // Method to delete a user
};

// Function to log in user
async function login(username, password) {
    const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });

    // Publish user to subscribers and store in local storage to stay logged in between page refreshes
    userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
}

// Function to log out user
function logout() {
    alertService.clear(); // Clear any alerts
    // Remove user from local storage, publish null to user subscribers, and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}

// Function to register a new user
async function register(user) {
    await fetchWrapper.post(`${baseUrl}/register`, user);
}

// Function to get all users
async function getAll() {
    return await fetchWrapper.get(baseUrl);
}

// Function to get user by ID
async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

// Function to update user information
async function update(id, params) {
    await fetchWrapper.put(`${baseUrl}/${id}`, params);

    // Update stored user if the logged-in user updated their own record
    if (id === userSubject.value.id) {
        // Update local storage
        const user = { ...userSubject.value, ...params };
        localStorage.setItem('user', JSON.stringify(user));

        // Publish updated user to subscribers
        userSubject.next(user);
    }
}

// Function to delete a user (prefixed with underscored because delete is a reserved word in JavaScript)
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);

    // Auto logout if the logged-in user deleted their own record
    if (id === userSubject.value.id) {
        logout();
    }
}
