// Importing necessary modules and services
import getConfig from 'next/config';
import { userService } from 'services';

// Getting public runtime configuration
const { publicRuntimeConfig } = getConfig();

// Exporting the fetchWrapper object that contains methods for making HTTP requests
export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

// Function to create a request with a specific method
function request(method) {
    // Returns a function that takes a URL and a body
    // It sets up the request options and makes the fetch request
    return (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// Helper functions

// Function to get the authorization header
// It checks if the user is logged in and if the request is to the API URL
// If both are true, it returns an Authorization header with the user's JWT
// Otherwise, it returns an empty object
function authHeader(url) {
    const user = userService.userValue;
    const isLoggedIn = user?.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

// Function to handle the response from the fetch request
// It checks if the response is JSON and parses it if it is
// It checks if the response is an error
// If it's a 401 or 403 error and the user is logged in, it logs the user out
// It gets the error message from the response body or the response status text
// If the response is not an error, it returns the parsed data
async function handleResponse(response) {
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
        if ([401, 403].includes(response.status) && userService.userValue) {
            userService.logout();
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}