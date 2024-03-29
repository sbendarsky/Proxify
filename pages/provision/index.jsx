import React, { useState, useEffect } from 'react';
import { Layout } from 'components/users'; // Assuming you have a similar Layout component for VMs

const ProvisionPage = () => {
    const [vmid, setVmid] = useState('');
    const [name, setName] = useState('');
    const [memory, setMemory] = useState('4096');
    const [cores, setCores] = useState('2');
    const [os, setOS] = useState('local:iso/alpine-standard-3.19.1-x86.iso,media=cdrom');

    const provisionVM = async () => {
        try {
            const response = await fetch('/api/proxmox/provision', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ vmid, name, memory, cores, os }),
            });

            if (response.ok) {
                alert('VM provisioned successfully');
            } else {
                alert('Failed to provision VM');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while provisioning VM');
        }
    };

    return (
        <Layout>
            <h1>Provision New Virtual Machine</h1>
            <form>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td><label htmlFor="vmid">VMID:</label></td>
                            <td><input type="text" id="vmid" value={vmid} onChange={(e) => setVmid(e.target.value)} className="form-control" placeholder="Enter VMID" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="name">Name:</label></td>
                            <td><input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter VM Name" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="memory">Memory (MB):</label></td>
                            <td><input type="text" id="memory" value={memory} onChange={(e) => setMemory(e.target.value)} className="form-control" placeholder="4096" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="cores">Cores:</label></td>
                            <td><input type="text" id="cores" value={cores} onChange={(e) => setCores(e.target.value)} className="form-control" placeholder="2" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="os">OS:</label></td>
                            <td><input type="text" id="os" value={os} onChange={(e) => setOS(e.target.value)} className="form-control" placeholder="local:iso/alpine-standard-3.19.1-x86.iso,media=cdrom" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <button type="button" onClick={provisionVM} className="btn btn-primary">Provision VM</button>
                </div>
            </form>
        </Layout>
    );
};

export default ProvisionPage;
