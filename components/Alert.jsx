import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { alertService } from 'services';

// Exporting Alert function component
export { Alert };

// Alert function component definition
function Alert() {
    const router = useRouter();
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        // Subscribe to new alert notifications
        const subscription = alertService.alert.subscribe(alert => setAlert(alert));

        // Unsubscribe when the component unmounts
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        // Clear alert on location change
        alertService.clear();
    }, [router]);

    // If no alert, return null to render nothing
    if (!alert) return null;

    // Render the alert component
    return (
        <div className="container">
            <div className="m-3">
                <div className={`alert alert-dismissible ${alert.type}`}>
                    {alert.message}
                    {/* Button to clear the alert */}
                    <button type="button" className="btn-close" onClick={() => alertService.clear()}></button>
                </div>
            </div>
        </div>
    );
}
