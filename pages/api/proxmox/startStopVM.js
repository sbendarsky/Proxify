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
    const { action, vmid } = req.body;
    if (action === 'start') {
      await client.post(`/nodes/proxmox24/qemu/${vmid}/status/start`);
      res.status(200).json({ message: `VM with ID ${vmid} has been started.` });
    } else if (action === 'stop') {
      await client.post(`/nodes/proxmox24/qemu/${vmid}/status/stop`);
      res.status(200).json({ message: `VM with ID ${vmid} has been stopped.` });
    } else {
      res.status(400).json({ error: 'Invalid action. Only "start" or "stop" actions are allowed.' });
    }
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: error.toString() });
  }
};
