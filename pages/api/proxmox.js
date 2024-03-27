// Importing necessary modules
import axios from 'axios';
import https from 'https';
import { serverRuntimeConfig } from 'next.config';

// Getting Proxmox configuration from server runtime configuration
const proxmox_url = serverRuntimeConfig.proxmoxURL;
const proxmox_token_id = serverRuntimeConfig.proxmox_token_id;
const proxmox_secret = serverRuntimeConfig.proxmox_secret;

// Creating an axios client for making requests to the Proxmox API
// The base URL is the Proxmox API URL
// The Authorization header is set with the Proxmox API token
// The httpsAgent is set to ignore unauthorized SSL certificates
const client = axios.create({
  baseURL: `${proxmox_url}/api2/json`,
  headers: {
    Authorization: `PVEAPIToken=${proxmox_token_id}=${proxmox_secret}`,
  },
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

// Exporting the default function for handling requests to this route
export default async (req, res) => {
  try {
    // Making a GET request to the '/nodes' endpoint of the Proxmox API
    const response = await client.get('/nodes');
    // Logging the response data
    console.log(response.data);
    // Sending the response data as JSON with a 200 status code
    res.status(200).json(response.data);
  } catch (error) {
    // Logging the error
    console.error(error);
    // Sending the error as JSON with a 500 status code
    res.status(500).json({ error: error.toString() });
  }
};