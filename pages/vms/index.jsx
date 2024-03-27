import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from 'components/users'; // Assuming you have a similar Layout component for VMs
import { Spinner } from 'components'; // Assuming you have a Spinner component

const VMPage = () => {
    const [vms, setVms] = useState(null);
    const [lastRefresh, setLastRefresh] = useState(Date.now());

    const getVMs = async () => {
        try {
            const res = await axios.get('/api/proxmox/getVM');
            setVms(res.data.data);
            setLastRefresh(Date.now());
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getVMs(); // Call getVMs immediately
        const intervalId = setInterval(getVMs, 7000); // Refresh every 7 seconds
        return () => clearInterval(intervalId); // Clean up interval on unmount
    }, []);

    const handleStartStop = async (action, vmid) => {
        try {
            await axios.post('/api/proxmox/startStopVM', { action, vmid });
            // After performing the action, refresh VM list
            getVMs();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <h1>VMs under host: proxmox24</h1>
            <div>Last Refresh: {new Date(lastRefresh).toLocaleTimeString()}</div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>VM</th>
                        <th style={{ width: '20%' }}>Status</th>
                        <th style={{ width: '20%' }}>CPU</th>
                        <th style={{ width: '20%' }}>MEM</th>
                        <th style={{ width: '20%' }}>UPTIME</th>
                        <th style={{ width: '10%' }}></th>
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
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <button onClick={() => handleStartStop('start', vm.vmid)} className="btn btn-sm btn-primary me-1">Start</button>
                                <button onClick={() => handleStartStop('stop', vm.vmid)} className="btn btn-sm btn-danger">Stop</button>
                            </td>
                        </tr>
                    ))}
                    {!vms && (
                        <tr>
                            <td colSpan="6">
                                <Spinner />
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
        </Layout>
    );
};

export default VMPage;