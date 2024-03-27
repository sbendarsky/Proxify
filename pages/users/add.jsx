// Importing necessary components
import { Layout, AddEdit } from 'components/users';

// Exporting the default function for this component
export default Add;

function Add() {
    // Rendering the Layout and AddEdit components
    // The Layout component is used for the overall layout of the page
    // The AddEdit component is used for the form to add a new user
    return (
        <Layout>
            <h1>Add User</h1>
            <AddEdit />
        </Layout>
    );
}