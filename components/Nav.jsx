import { useState, useEffect } from 'react';

import { NavLink } from '.'; // Assuming NavLink component is imported from the same directory
import { userService } from 'services';

// Exporting Nav function component
export { Nav };

// Nav function component definition
function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Subscribe to user changes
        const subscription = userService.user.subscribe(x => setUser(x));
        
        // Unsubscribe when the component unmounts
        return () => subscription.unsubscribe();
    }, []);

    // Only show nav when logged in
    if (!user) return null;

    // Render the navigation bar
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                {/* NavLink components for different navigation links */}
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <NavLink href="/nodes" className="nav-item nav-link">Nodes</NavLink>
                <NavLink href="/vms" className="nav-item nav-link">Virtual Machines</NavLink>
                <NavLink href="/images" className="nav-item nav-link">Images</NavLink>
                <NavLink href="/logs" className="nav-item nav-link">Logs</NavLink>
                <NavLink href="/users" className="nav-item nav-link">Users</NavLink>
                
                {/* Button for logout */}
                <button onClick={userService.logout} className="btn btn-link nav-item nav-link">Logout</button>
            </div>
        </nav>
    );
}