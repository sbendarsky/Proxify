// Import necessary modules from React and Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Import custom components and services
import { Layout, AddEdit } from 'components/users'; // Import Layout and AddEdit components from users module
import { Spinner } from 'components'; // Import Spinner component from components module
import { userService, alertService } from 'services'; // Import userService and alertService from services module

// Define Edit component
export default Edit;

// Edit component function definition
function Edit() {
    const router = useRouter(); // Initialize router for navigation
    const [user, setUser] = useState(null); // Initialize user state to null

    // Effect hook to fetch user data when component mounts or when router changes
    useEffect(() => {
        const { id } = router.query; // Extract user ID from router query parameters
        if (!id) return; // Return if user ID is not available in query parameters

        // Fetch user by ID and set default form values if in edit mode
        userService.getById(id)
            .then(x => setUser(x)) // Set user state with fetched user data
            .catch(alertService.error); // Display error alert if fetching user data fails
    }, [router]); // Run effect hook when router changes

    // Return JSX for Edit component
    return (
        <Layout> {/* Use Layout component for consistent page layout */}
            <h1>Edit User</h1>
            {user ? <AddEdit user={user} /> : <Spinner />} {/* Render AddEdit component with user data if available, otherwise render Spinner */}
        </Layout>
    );
}
