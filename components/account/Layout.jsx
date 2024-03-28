import { useEffect } from 'react'; // Importing useEffect hook from React
import { useRouter } from 'next/router'; // Importing useRouter hook from Next.js

import { userService } from 'services'; // Importing userService from services module

// Exporting the Layout function component
export { Layout };

// Layout function component definition
function Layout({ children }) {
    const router = useRouter(); // Initializing useRouter hook

    useEffect(() => {
        // useEffect hook for component lifecycle

        // Redirect to home if already logged in
        if (userService.userValue) {
            router.push('/'); // Redirecting to home page
        }
    }, []); // Empty dependency array means this effect will run only once after the component mounts

    // Returning the layout structure with children elements
    return (
        <div className="col-md-6 offset-md-3 mt-5">
            {children} {/* Rendering children elements */}
        </div>
    );
}
