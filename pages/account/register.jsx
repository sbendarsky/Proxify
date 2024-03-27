// Importing necessary modules and components
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Layout } from 'components/account';
import { userService, alertService } from 'services';

// Exporting the Register component
export default Register;

function Register() {
    // Using the useRouter hook to get the router object
    const router = useRouter();

    // Defining form validation rules using Yup
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
    });
    // Defining form options for react-hook-form
    const formOptions = { resolver: yupResolver(validationSchema) };

    // Using the useForm hook to get form methods and state
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    // Function to handle form submission
    function onSubmit(user) {
        // Attempting to register with the provided user data
        return userService.register(user)
            .then(() => {
                // If registration is successful, display a success alert and redirect to the login page
                alertService.success('Registration successful', true);
                router.push('login');
            })
            // If registration fails, display an error alert
            .catch(alertService.error);
    }

    // Rendering the registration form
    return (
        <Layout>
            <div className="card">
                <h4 className="card-header">Register</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Form fields for first name, last name, username, and password */}
                        {/* Each field has validation and error handling */}
                        {/* The form also has a submit button and a cancel button that redirects to the login page */}
                    </form>
                </div>
            </div>
        </Layout>
    );
}