// Import Layout and AddEdit components from users module
import { Layout, AddEdit } from 'components/users';

// Define Add component
export default Add;

// Add component function definition
function Add() {
    // Return JSX for Add component
    return (
        <Layout> {/* Use Layout component for consistent page layout */}
            <h1>Add User</h1>
            <AddEdit /> {/* Render AddEdit component */}
        </Layout>
    );
}
