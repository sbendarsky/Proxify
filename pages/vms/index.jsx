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
                        </tr>
                    ))}
                    {!vms &&
                        <tr>
                            <td colSpan="5" className="text-center">
                                <span className="spinner-border spinner-border-sm"></span>
                            </td>
                        </tr>
                    }
                    {vms && !vms.length &&
                        <tr>
                            <td colSpan="5" className="text-center">
                                <div className="p-2">No VMs To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default VMPage;