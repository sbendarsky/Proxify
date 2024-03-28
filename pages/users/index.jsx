import Link from 'next/link'; // Import Link component from Next.js
import { useState, useEffect } from 'react'; // Import useState and useEffect hooks from React

import { Spinner } from 'components'; // Import Spinner component from components module
import { Layout } from 'components/users'; // Import Layout component from users module
import { userService } from 'services'; // Import userService from services module

// Define Index component
export default Index;

// Index component function definition
function Index() {
    const [users, setUsers] = useState(null); // Initialize users state to null

    // Effect hook to fetch users data when component mounts
    useEffect(() => {
        userService.getAll().then(x => setUsers(x)); // Fetch all users and set users state
    }, []); // Run effect hook only once when component mounts

    // Function to delete a user by ID
    function deleteUser(id) {
        // Update users state to mark user as deleting
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));

        // Call userService to delete user by ID
        userService.delete(id).then(() => {
            // Update users state to remove deleted user
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

    // Return JSX for Index component
    return (
        <Layout> {/* Use Layout component for consistent page layout */}
            <h1>Users</h1>
            <Link href="/users/add" className="btn btn-sm btn-success mb-2">Add User</Link> {/* Link to add user page */}
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
                    {/* Map over users array to render user data */}
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                {/* Link to edit user page */}
                                <Link href={`/users/edit/${user.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                {/* Button to delete user */}
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={user.isDeleting}>
                                    {user.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {/* Display spinner while fetching users */}
                    {!users &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {/* Display message when no users are available */}
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </Layout>
    );
}
