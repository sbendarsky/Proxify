// Import necessary modules
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Import userService from services
import { userService } from 'services';

// Define Layout component
export { Layout };

function Layout({ children }) {
    // Get router instance
    const router = useRouter();

    // Effect hook to run once after the component mounts
    useEffect(() => {
        // Redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }
    }, []); // Empty dependency array means this effect runs only once after mount

    // Return the layout structure with children components
    return (
        <div className="col-md-6 offset-md-3 mt-5">
            {children}
        </div>
    );
}