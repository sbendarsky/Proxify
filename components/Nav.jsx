import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

// Export the Nav component
export { Nav };

// Define the Nav component
function Nav() {
    // State to store the current user
    const [user, setUser] = useState(null);

    // Effect hook to subscribe to changes in user authentication status
    useEffect(() => {
        // Subscribe to changes in user authentication status
        const subscription = userService.user.subscribe(x => setUser(x));
        
        // Clean up function to unsubscribe when the component unmounts
        return () => subscription.unsubscribe();
    }, []);

    // Only show nav when logged in
    if (!user) return null;

    // Render the navigation bar
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <NavLink href="/nodes" className="nav-item nav-link">Nodes</NavLink>
                <NavLink href="/vms" className="nav-item nav-link">Virtual Machines</NavLink>
                <NavLink href="/users" className="nav-item nav-link">Users</NavLink>
                <button onClick={userService.logout} className="btn btn-link nav-item nav-link">Logout</button>
            </div>
        </nav>
    );
}