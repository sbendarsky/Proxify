import Head from 'next/head'; // Import Head component from Next.js
import { useState, useEffect } from 'react'; // Import useState and useEffect hooks from React
import { useRouter } from 'next/router'; // Import useRouter hook from Next.js

import 'styles/globals.css'; // Import global styles

import { userService } from 'services'; // Import userService from services module
import { Nav, Alert } from 'components'; // Import Nav and Alert components from components module

// Define App component
export default App;

// App component function definition
function App({ Component, pageProps }) {
    const router = useRouter(); // Initialize router for navigation
    const [user, setUser] = useState(null); // Initialize user state to null
    const [authorized, setAuthorized] = useState(false); // Initialize authorized state to false

    // Effect hook to run auth check on component mount and on route changes
    useEffect(() => {
        // Function to check authentication status
        const authCheck = (url) => {
            // Redirect to login page if accessing a private page and not logged in
            setUser(userService.userValue);
            const publicPaths = ['/account/login', '/account/register'];
            const path = url.split('?')[0];
            if (!userService.userValue && !publicPaths.includes(path)) {
                setAuthorized(false);
                router.push({
                    pathname: '/account/login',
                    query: { returnUrl: router.asPath }
                });
            } else {
                setAuthorized(true);
            }
        };

        // Run auth check on initial load
        authCheck(router.asPath);

        // Hide page content by setting authorized to false on route change start
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // Run auth check on route change complete
        router.events.on('routeChangeComplete', authCheck);

        // Unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        };
    }, []);

    // Return JSX for App component
    return (
        <>
            <Head>
                <title>Proxify</title> {/* Set document title */}
            </Head>

            <div className={`app-container ${user ? 'bg-light' : ''}`}> {/* Render app container with background color if user is logged in */}
                <Nav /> {/* Render navigation bar */}
                <Alert /> {/* Render alert component */}
                {authorized && <Component {...pageProps} />} {/* Render component if authorized */}
            </div>
        </>
    );
}
