import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import axios from 'axios'; // Import axios for making HTTP requests
import Link from 'next/link'; // Import Link component from Next.js

// Define Nodes component
const Nodes = () => {
    const [nodes, setNodes] = useState(null); // Initialize state for nodes

    // Function to fetch nodes data from the API
    const getNodes = async () => {
        try {
            const res = await axios.get('/api/proxmox/getNodes'); // Make GET request to API endpoint
            setNodes(res.data.data); // Update state with nodes data from response
        } catch (err) {
            console.error(err); // Log error if request fails
        }
    };

    // Effect hook to fetch nodes data when component mounts
    useEffect(() => {
        getNodes(); // Call getNodes function
    }, []); // Empty dependency array ensures the effect runs only once after initial render

    // JSX to render Nodes component
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

export default Nodes; // Export Nodes component
