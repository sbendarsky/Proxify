import { useState, useEffect } from 'react';

import { NavLink } from '.'; // Assuming NavLink component is imported from the same directory
import { userService } from 'services';

// Exporting Nav function component
export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    if (!user) return null;

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <NavLink href="/vms" className="nav-item nav-link">Virtual Machines</NavLink>
                <NavLink href="/provision" className="nav-item nav-link">Provision VM</NavLink>
                
                {/* Only show these links to admin users */}
                {user.isAdmin && (
                    <>
                        <NavLink href="/nodes" className="nav-item nav-link">Nodes</NavLink>
                        <NavLink href="/images" className="nav-item nav-link">Images</NavLink>
                        <NavLink href="/logs" className="nav-item nav-link">Logs</NavLink>
                        <NavLink href="/users" className="nav-item nav-link">Users</NavLink>
                    </>
                )}
                <button onClick={userService.logout} className="btn btn-link nav-item nav-link">Logout</button>
            </div>
        </nav>
    );
}