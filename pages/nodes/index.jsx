// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

// Defining the Nodes component
const Nodes = () => {
    // Using the useState hook to manage the nodes state
    const [nodes, setNodes] = useState(null);

    // Defining the getNodes function to fetch nodes data from the API
    const getNodes = async () => {
        try {
            // Making a GET request to the '/api/proxmox' endpoint
            const res = await axios.get('/api/proxmox');
            // Setting the nodes state with the response data
            setNodes(res.data.data);
        } catch (err) {
            // Logging any errors
            console.error(err);
        }
    };

    // Using the useEffect hook to call the getNodes function when the component mounts
    useEffect(() => {
        getNodes();
    }, []);

    // Rendering the nodes data in a table
    return (
        <div>
            <h1>Nodes</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {/* Defining the table headers */}
                    </tr>
                </thead>
                <tbody>
                    {/* Mapping over the nodes state to render each node in a table row */}
                    {/* If the nodes state is null, rendering a loading spinner */}
                    {/* If the nodes state is an empty array, rendering a message */}
                </tbody>
            </table>
        </div>
    );
};

// Exporting the Nodes component
export default Nodes;