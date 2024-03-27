import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from 'components/users'; // Assuming you have a similar Layout component for Nodes
import { Spinner } from 'components'; // Assuming you have a Spinner component

const Nodes = () => {
    const [nodes, setNodes] = useState(null);

    const getNodes = async () => {
        try {
            const res = await axios.get('/api/proxmox/getNodes');
            setNodes(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getNodes();
    }, []);

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
                            <td>{node.status}</td>
                            <td>{node.cpu}</td>
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