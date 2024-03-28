// api/proxmox/postImages.js
import axios from 'axios';
import https from 'https';
import { serverRuntimeConfig } from 'next.config';

const proxmox_url = serverRuntimeConfig.proxmoxURL;
const proxmox_token_id = serverRuntimeConfig.proxmox_token_id;
const proxmox_secret = serverRuntimeConfig.proxmox_secret;
const node = 'proxmox24'; // Adjust the node name as per your setup
const storage = 'local'; // Adjust the storage name as per your setup

const client = axios.create({
  baseURL: `${proxmox_url}/api2/json/nodes/${node}/storage/${storage}/content`,
  headers: {
    Authorization: `PVEAPIToken=${proxmox_token_id}=${proxmox_secret}`,
  },
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

export default async (req, res) => {
  try {
    // Assuming the request body contains the file data
    const formData = new FormData();
    formData.append('filename', req.body.file.filename);
    formData.append('file', req.body.file, req.body.file.filename);
    const response = await client.post('', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error adding ISO image:', error);
    res.status(500).json({ error: error.toString() });
  }
};
