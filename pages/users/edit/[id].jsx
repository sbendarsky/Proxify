// Importing necessary modules and components
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout, AddEdit } from 'components/users';
import { Spinner } from 'components';
import { userService, alertService } from 'services';

// Exporting the default function for this component
export default Edit;

function Edit() {
    // Using the useRouter hook to access the router object
    const router = useRouter();
    // Using the useState hook to manage the user state
    const [user, setUser] = useState(null);

    // Using the useEffect hook to fetch user data when the component mounts
    useEffect(() => {
        // Getting the ID from the router query
        const { id } = router.query;
        // If the ID is not defined, returning early
        if (!id) return;

        // Fetching the user data and setting the default form values if in edit mode
        userService.getById(id)
            .then(x => setUser(x)) // Setting the user state with the response data
            .catch(alertService.error) // Logging any errors
    }, [router]);

    // Rendering the Layout and AddEdit components
    // The Layout component is used for the overall layout of the page
    // The AddEdit component is used for the form to edit the user
    // If the user state is null, rendering a loading spinner
    return (
        <Layout>
            <h1>Edit User</h1>
            {user ? <AddEdit user={user} /> : <Spinner />}
        </Layout>
    );
}