import axios from 'axios';
import exp from 'constants';
import https from 'https';
import { serverRuntimeConfig } from 'next.config';

const proxmox_url = serverRuntimeConfig.proxmoxURL;
const proxmox_token_id = serverRuntimeConfig.proxmox_token_id;
const proxmox_secret = serverRuntimeConfig.proxmox_secret;

const client = axios.create({
  baseURL: `${proxmox_url}/api2/json`,
  headers: {
    Authorization: `PVEAPIToken=${proxmox_token_id}=${proxmox_secret}`,
  },
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

export default async (req, res) => {
  try {
    const response = await client.get('/nodes');
    // console.log(response.data); // Log the response data
    res.status(200).json(response.data);
  } catch (error) {
    // console.error(error); // Log the error
    res.status(500).json({ error: error.toString() });
  }
};

