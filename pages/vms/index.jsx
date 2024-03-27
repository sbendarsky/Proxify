import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VMPage = () => {
    const [vms, setVms] = useState(null);

    const getVMs = async () => {
        try {
            const res = await axios.get('/api/proxmox/getVM');
            setVms(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleStartStop = async (action, vmid) => {
        try {
            await axios.post('/api/proxmox/startStopVM', { action, vmid });
            // After performing the action, refresh VM list
            getVMs();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getVMs();
    }, []);

    return (
        <div>
            <h1>VMs under host: proxmox24</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>VM</th>
                        <th style={{ width: '30%' }}>Status</th>
                        <th style={{ width: '30%' }}>CPU</th>
                        <th style={{ width: '30%' }}>MEM</th>
                        <th style={{ width: '30%' }}>UPTIME</th>
                        <th style={{ width: '30%' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vms && vms.map((vm, index) => (
                        <tr key={index}>
                            <td>{vm.name}</td>
                            <td>{vm.status}</td>
                            <td>{vm.cpu}</td>
                            <td>{vm.mem}</td>
                            <td>{vm.uptime}</td>
                            <td>
                                <button onClick={() => handleStartStop('start', vm.vmid)}>Start</button>
                                <button onClick={() => handleStartStop('stop', vm.vmid)}>Stop</button>
                            </td>
                        </tr>
                    ))}
                    {!vms && (
                        <tr>
                            <td colSpan="6" className="text-center">
                                <span className="spinner-border spinner-border-sm"></span>
                            </td>
                        </tr>
                    )}
                    {vms && !vms.length && (
                        <tr>
                            <td colSpan="6" className="text-center">
                                <div className="p-2">No VMs To Display</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default VMPage;
