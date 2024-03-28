// Import necessary modules
import getConfig from 'next/config';

// Import userService from services
import { userService } from 'services';

// Get public runtime configuration
const { publicRuntimeConfig } = getConfig();

// Define fetchWrapper object containing HTTP request methods
export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

// Define request function to create HTTP requests
function request(method) {
    return (url, body) => {
        // Set request options
        const requestOptions = {
            method,
            headers: authHeader(url)
        };

        // Set request body if provided
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }

        // Send fetch request and handle response
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// Helper function to set authentication header
function authHeader(url) {
    // Return auth header with JWT if user is logged in and request is to the API URL
    const user = userService.userValue;
    const isLoggedIn = user?.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

// Helper function to handle response
async function handleResponse(response) {
    // Check if response is JSON
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    // Check for error response
    if (!response.ok) {
        // Auto logout if 401 Unauthorized or 403 Forbidden response returned from API
        if ([401, 403].includes(response.status) && userService.userValue) {
            userService.logout();
        }

        // Get error message from body or default to response status
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}