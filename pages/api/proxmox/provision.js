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
    const node = 'proxmox24';
    const vmConfig = {
      node: node,
      pool: 'Ort',
      vmid: 191,
      name: 'test-vm',
      ostype: 'l26',
      memory: 2048,
      sockets: 1,
      cores: 1,
      net0: 'virtio,bridge=vmbr159',
      ide2: 'local:iso/alpine-standard-3.19.1-x86.iso,media=cdrom',

    };

    // Access the vmid from vmConfig
    const vmid = vmConfig.vmid;

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
