// Importing necessary modules and components
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Layout } from 'components/account';
import { userService, alertService } from 'services';

// Exporting the Login component
export default Login;

function Login() {
    // Using the useRouter hook to get the router object
    const router = useRouter();

    // Defining form validation rules using Yup
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    // Defining form options for react-hook-form
    const formOptions = { resolver: yupResolver(validationSchema) };

    // Using the useForm hook to get form methods and state
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    // Function to handle form submission
    function onSubmit({ username, password }) {
        // Clearing any existing alerts
        alertService.clear();
        // Attempting to log in with the provided username and password
        return userService.login(username, password)
            .then(() => {
                // If login is successful, redirect to the return URL or the home page
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
            // If login fails, display an error alert
            .catch(alertService.error);
    }

    // Rendering the login form
    return (
        <Layout>
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
                        <Link href="/account/register" className="btn btn-link">Register</Link>
                    </form>
                </div>
            </div>
        </Layout>
    );
}