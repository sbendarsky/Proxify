import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from 'components/users'; // Assuming you have a similar Layout component for Nodes
import { Spinner } from 'components'; // Assuming you have a Spinner component

const Nodes = () => {
    const [nodes, setNodes] = useState(null);

    const getNodes = async () => {
        try {
            const res = await axios.get('/api/proxmox/getNodes');
            const sortedNodes = res.data.data.sort((a, b) => {
                // Sort by CPU value, NaN will be considered last
                if (isNaN(a.cpu)) return 1;
                if (isNaN(b.cpu)) return -1;
                return b.cpu - a.cpu; // Sort descending
            });
            setNodes(sortedNodes);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getNodes();
    }, []);

    // Helper function to format CPU percentage
    const formatCPU = (cpu) => {
        return `${(cpu * 100).toFixed(2)}%`;
    };

    return (
        <Layout>
            <h1>Nodes</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Node Name</th>
                        <th style={{ width: '30%' }}>Status</th>
                        <th style={{ width: '30%' }}>CPU</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {nodes && nodes.map((node, index) => (
                        <tr key={index}>
                            <td>{node.node}</td>
                            <td style={{ color: isNaN(node.cpu) ? 'red' : 'green' }}>{isNaN(node.cpu) ? 'NaN' : 'Up'}</td>
                            <td>{formatCPU(node.cpu)}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                            </td>
                        </tr>
                    ))}
                    {!nodes && (
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    )}
                    {nodes && !nodes.length && (
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Nodes To Display</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Layout>
    );
};

export default Nodes;
