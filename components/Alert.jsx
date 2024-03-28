import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { alertService } from 'services';

// Export the Alert component
export { Alert };

// Define the Alert component
function Alert() {
    // Get the router instance
    const router = useRouter();

    // State to store the current alert
    const [alert, setAlert] = useState(null);

    // Effect hook to subscribe to new alert notifications
    useEffect(() => {
        // Subscribe to new alert notifications
        const subscription = alertService.alert.subscribe(alert => setAlert(alert));

        // Unsubscribe when the component unmounts
        return () => subscription.unsubscribe();
    }, []);

    // Effect hook to clear alert on location change
    useEffect(() => {
        // Clear alert on location change
        alertService.clear();
    }, [router]);

    // If no alert, return null
    if (!alert) return null;

    // Render the alert if available
    return (
        <div className="container">
            <div className="m-3">
                <div className={`alert alert-dismissible ${alert.type}`}>
                    {alert.message}
                    <button type="button" className="btn-close" onClick={() => alertService.clear()}></button>
                </div>
            </div>
        </div>
    );
}
