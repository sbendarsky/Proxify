import { useRouter } from 'next/router'; // Import useRouter hook from Next.js for navigation
import Link from 'next/link'; // Import Link component from Next.js for client-side navigation
import { useForm } from 'react-hook-form'; // Import useForm hook from react-hook-form for form handling
import { yupResolver } from '@hookform/resolvers/yup'; // Import yupResolver from @hookform/resolvers/yup for Yup validation integration
import * as Yup from 'yup'; // Import Yup for form validation

import { Layout } from 'components/account'; // Import Layout component for the account page
import { userService, alertService } from 'services'; // Import userService and alertService from services

export default Login;

function Login() {
    const router = useRouter(); // Initialize router for navigation

    // Define form validation rules using Yup schema
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'), // Username must be provided
        password: Yup.string().required('Password is required') // Password must be provided
    });

    // Set up form options including resolver for Yup validation
    const formOptions = { resolver: yupResolver(validationSchema) };

    // Extract functions and errors from useForm hook to build form
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    // Function to handle form submission
    function onSubmit({ username, password }) {
        alertService.clear(); // Clear any existing alerts
        return userService.login(username, password) // Call login method from userService
            .then(() => {
                // Redirect user to returnUrl or default to '/'
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
            .catch(alertService.error); // Display error alert if login fails
    }

    return (
        <Layout> {/* Use Layout component for consistent page layout */}
            <div className="card">
                <h4 className="card-header">Login</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            Login
                        </button>
                        <Link href="/account/register" className="btn btn-link">Register</Link> {/* Link to registration page */}
                    </form>
                </div>
            </div>
        </Layout>
    );
}
