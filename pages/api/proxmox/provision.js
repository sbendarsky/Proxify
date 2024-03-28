import axios from 'axios';
import https from 'https';
import { serverRuntimeConfig } from 'next.config';

const proxmox_url = serverRuntimeConfig.proxmoxURL;
const proxmox_token_id = serverRuntimeConfig.proxmox_token_id;
const proxmox_secret = serverRuntimeConfig.proxmox_secret;

const client = axios.create({
  baseURL: `${proxmox_url}/api2/json`,
  headers: {
    Authorization: `PVEAPIToken=${proxmox_token_id}@pam=${proxmox_secret}`,
  },
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

export default async (req, res) => {
  try {
    const node = 'proxmox24';
    const vmid = '101';
    const vmConfig = {
      vmid,
      ostype: 'l26',
      disk: '10',
      cores: '2',
      memory: '2048',
      storage: 'local',
      net0: 'virtio,bridge=vmbr159',
      ide2: 'local:iso/Fedora-Workstation-Live-x86_64-39-1.5.iso', // Specify the ISO image correctly
    };

    const response = await client.post(`/nodes/${node}/qemu/`, vmConfig);

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
