// Import necessary modules from Next.js and React
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Import Layout component and services from custom modules
import { Layout } from 'components/account';
import { userService, alertService } from 'services';

// Define Register component
export default Register;

// Register component function definition
function Register() {
    const router = useRouter(); // Initialize router for navigation

    // Define form validation rules using Yup schema
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'), // First Name must be provided
        lastName: Yup.string()
            .required('Last Name is required'), // Last Name must be provided
        username: Yup.string()
            .required('Username is required'), // Username must be provided
        password: Yup.string()
            .required('Password is required') // Password must be provided
            .min(6, 'Password must be at least 6 characters') // Password must be at least 6 characters long
    });
    const formOptions = { resolver: yupResolver(validationSchema) }; // Set up form options including resolver for Yup validation

    // Extract functions and errors from useForm hook to build form
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    // Function to handle form submission
    function onSubmit(user) {
        return userService.register(user) // Call register method from userService
            .then(() => {
                alertService.success('Registration successful', true); // Display success alert
                router.push('login'); // Redirect user to login page
            })
            .catch(alertService.error); // Display error alert if registration fails
    }

    // Return JSX for Register component
    return (
        <Layout> {/* Use Layout component for consistent page layout */}
            <div className="card">
                <h4 className="card-header">Register</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Register
                        </button>
                        <Link href="/account/login" className="btn btn-link">Cancel</Link> {/* Link to login page */}
                    </form>
                </div>
            </div>
        </Layout>
    );
}
