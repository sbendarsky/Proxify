// Import necessary modules
import getConfig from 'next/config';
import { userService } from 'services';

// Get public runtime configuration from Next.js
const { publicRuntimeConfig } = getConfig();

// Export fetchWrapper object with HTTP request methods
export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body) => {
        // Construct request options
        const requestOptions = {
            method,
            headers: authHeader(url)
        };

        // Include body if provided
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }

        // Perform fetch operation and handle response
        return fetch(url, requestOptions).then(handleResponse);
    };
}


function authHeader(url) {
    // Check if user is logged in and if the request is to API URL
    const user = userService.userValue;
    const isLoggedIn = user?.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);

    // Generate authorization header with JWT token if conditions are met
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

async function handleResponse(response) {
    // Check if response contains JSON content
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    // Check for error response
    if (!response.ok) {
        // Auto logout if 401 Unauthorized or 403 Forbidden response is received from API
        if ([401, 403].includes(response.status) && userService.userValue) {
            userService.logout();
        }

        // Get error message from body or default to response status
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}
