import React, { useState } from 'react';

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
        <div className="centered-container"> {/* Apply centered-container class */}
            <div>
                <label htmlFor="vmid">VMID:</label>
                <input
                    type="text"
                    id="vmid"
                    value={vmid}
                    onChange={(e) => setVmid(e.target.value)}
                    placeholder="Enter VMID"
                />
            </div>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter VM Name"
                />
            </div>
            <div>
                <label htmlFor="memory">Memory (MB):</label>
                <input
                    type="text"
                    id="memory"
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                    placeholder="4096"
                />
            </div>
            <div>
                <label htmlFor="cores">Cores:</label>
                <input
                    type="text"
                    id="cores"
                    value={cores}
                    onChange={(e) => setCores(e.target.value)}
                    placeholder="2"
                />
            </div>
            <div>
                <label htmlFor="os">OS:</label>
                <input
                    type="text"
                    id="os"
                    value={os}
                    onChange={(e) => setOS(e.target.value)}
                    placeholder="local:iso/alpine-standard-3.19.1-x86.iso,media=cdrom"
                />
            </div>
            <button onClick={provisionVM}>Provision VM</button>
        </div>
    );
};

export default ProvisionPage;
