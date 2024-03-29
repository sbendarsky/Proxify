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
    const { vmid, name, memory, cores, os } = req.body;
    const node = 'proxmox24';
    const vmConfig = {
      node: node,
      pool: 'Ort',
      vmid: vmid,
      name: name,
      ostype: 'l26',
      memory: memory,
      sockets: 1,
      cores: cores,
      net0: 'virtio,bridge=vmbr159',
      ide2: os,
    };

    const response = await client.post(`/nodes/${node}/qemu`, vmConfig);

    if (response.status === 200) {
      res.json({ message: 'VM created successfully' });
    } else {
      res.json({ message: 'Failed to create VM' });
    }
  } catch (error) {
    console.error(error);
    res.json({ message: 'An error occurred' });
  }
};