// Importing necessary modules and components
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Spinner } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';

// Exporting the default function for this component
export default Index;

function Index() {
    // Using the useState hook to manage the users state
    const [users, setUsers] = useState(null);

    // Using the useEffect hook to fetch users data when the component mounts
    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    // Defining the deleteUser function to delete a user
    function deleteUser(id) {
        // Updating the users state to set the isDeleting property of the user to true
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        // Calling the delete method of the userService object to delete the user
        userService.delete(id).then(() => {
            // Updating the users state to remove the deleted user
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

    // Rendering the users data in a table
    return (
        <Layout>
            <h1>Users</h1>
            <Link href="/users/add" className="btn btn-sm btn-success mb-2">Add User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>First Name</th>
                        <th style={{ width: '30%' }}>Last Name</th>
                        <th style={{ width: '30%' }}>Username</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapping over the users state to render each user in a table row */}
                    {/* If the users state is null, rendering a loading spinner */}
                    {/* If the users state is an empty array, rendering a message */}
                </tbody>
            </table>
        </Layout>
    );
}