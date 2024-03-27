import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import 'styles/globals.css';

import { userService } from 'services';
import { Nav, Alert } from 'components';

// Exporting the default function for this component
export default App;

function App({ Component, pageProps }) {
    // Using the useRouter hook to access the router object
    const router = useRouter();
    // Using the useState hook to manage the user and authorized states
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    // Using the useEffect hook to run an auth check when the component mounts and when the route changes
    useEffect(() => {
        // On initial load - run auth check 
        authCheck(router.asPath);

        // On route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // On route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // Unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, []);

    // Defining the authCheck function to check if the user is authorized to access the current page
    function authCheck(url) {
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
    }

    // Rendering the page content
    // The Nav and Alert components are always rendered
    // The page content (Component) is only rendered if authorized is true
    return (
        <>
            <Head>
                <title>Proxify</title>
            </Head>

            <div className={`app-container ${user ? 'bg-light' : ''}`}>
                <Nav />
                <Alert />
                {authorized &&
                    <Component {...pageProps} />
                }
            </div>
        </>
    );
}