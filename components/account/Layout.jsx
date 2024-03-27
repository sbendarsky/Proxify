// Importing useEffect hook from React
import { useEffect } from 'react';
// Importing useRouter hook from Next.js
import { useRouter } from 'next/router';

// Importing userService from services
import { userService } from 'services';

// Exporting the Layout component
export { Layout };

// Layout is a functional component in React
function Layout({ children }) {
    // Using the useRouter hook to get the router object
    const router = useRouter();

    // Using the useEffect hook to perform side effects
    useEffect(() => {
        // If the user is already logged in, redirect to home
        if (userService.userValue) {
            router.push('/');
        }
    }, []); // Empty dependency array means this effect will only run once, similar to componentDidMount in class components

    // The component returns a div that wraps the children components
    return (
        <div className="col-md-6 offset-md-3 mt-5">
            {children} {/* Rendering the children components */}
        </div>
    );
}