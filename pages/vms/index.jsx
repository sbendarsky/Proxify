import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect from React
import axios from 'axios'; // Import axios for HTTP requests

// Define VMPage component
const VMPage = () => {
    const [vms, setVms] = useState(null); // Initialize vms state to null

    // Function to fetch VMs data from the server
    const getVMs = async () => {
        try {
            const res = await axios.get('/api/proxmox/getVM'); // Send GET request to server to fetch VMs data
            setVms(res.data.data); // Set vms state with fetched VMs data
        } catch (err) {
            console.error(err); // Log error if fetching VMs data fails
        }
    };

    // Effect hook to fetch VMs data when component mounts
    useEffect(() => {
        getVMs(); // Call getVMs function to fetch VMs data
    }, []); // Run effect hook only once when component mounts

    // Return JSX for VMPage component
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
                    {/* Map over vms array to render VM data */}
                    {vms && vms.map((vm, index) => (
                        <tr key={index}>
                            <td>{vm.name}</td>
                            <td>{vm.status}</td>
                            <td>{vm.cpu}</td>
                            <td>{vm.mem}</td>
                            <td>{vm.uptime}</td>
                        </tr>
                    ))}
                    {/* Display spinner while fetching VMs data */}
                    {!vms &&
                        <tr>
                            <td colSpan="5" className="text-center">
                                <span className="spinner-border spinner-border-sm"></span>
                            </td>
                        </tr>
                    }
                    {/* Display message when no VMs are available */}
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

export default VMPage; // Export VMPage component
