import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Nodes = () => {
    const [nodes, setNodes] = useState(null);

    const getNodes = async () => {
        try {
            const res = await axios.get('/api/proxmox');
            setNodes(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getNodes();
    }, []);

    return (
        <div>
            <h1>Nodes</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Node</th>
                        <th style={{ width: '30%' }}>Status</th>
                        <th style={{ width: '30%' }}>CPU</th>
                        <th style={{ width: '30%' }}>MEM</th>
                        <th style={{ width: '30%' }}>UPTIME</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {nodes && nodes.map((node, index) => (
                        <tr key={index}>
                            <td>{node.node}</td>
                            <td>{node.status}</td>
                            <td>{node.cpu}</td>
                            <td>{node.mem}</td>
                            <td>{node.uptime}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                            </td>
                        </tr>
                    ))}
                    {!nodes &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-sm"></span>
                            </td>
                        </tr>
                    }
                    {nodes && !nodes.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Nodes To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Nodes;