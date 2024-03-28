import axios from 'axios';
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
        const response = await client.get('/nodes/proxmox24/storage/local/content');
        const isoImages = response.data.data || []; // Extract ISO image data from the response
        res.status(200).json(isoImages);
    } catch (error) {
        console.error('Error fetching ISO images:', error);
        res.status(500).json({ error: error.toString() });
    }
};
