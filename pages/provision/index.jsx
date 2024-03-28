import React from 'react';

const ProvisionPage = () => {
    const provisionVM = async () => {
        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/proxmox/provision', { method: 'POST' });

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
        <div>
            <button onClick={provisionVM}>Provision VM</button>
        </div>
    );
};

export default ProvisionPage;