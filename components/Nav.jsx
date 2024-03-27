import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

export { Nav };

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
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <NavLink href="/nodes" className="nav-item nav-link">Nodes</NavLink>
                <NavLink href="/users" className="nav-item nav-link">Users</NavLink>
                <button onClick={userService.logout} className="btn btn-link nav-item nav-link">Logout</button>
            </div>
        </nav>
    );
}