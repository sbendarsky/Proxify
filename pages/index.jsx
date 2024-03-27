// Importing necessary modules and components
import Link from 'next/link';
import { userService } from 'services';

// Exporting the default function for this component
export default Home;

function Home() {
    // Rendering a welcome message and a link to manage users
    // The userService.userValue object is used to get the current user's first name
    // The optional chaining operator (?.) is used to avoid a TypeError if userValue is undefined
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {userService.userValue?.firstName}!</h1>
                <p>Welcome to Proxify</p>
                <p><Link href="/users">Manage Users</Link></p>
            </div>
        </div>
    );
}