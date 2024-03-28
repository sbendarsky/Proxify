import { useRouter } from 'next/router'; // Importing useRouter hook from Next.js
import Link from 'next/link'; // Importing Link component from Next.js
import { useForm } from 'react-hook-form'; // Importing useForm hook from react-hook-form
import { yupResolver } from '@hookform/resolvers/yup'; // Importing yupResolver function from @hookform/resolvers/yup
import * as Yup from 'yup'; // Importing Yup object from yup library

import { userService, alertService } from 'services'; // Importing userService and alertService from services module

export { AddEdit }; // Exporting AddEdit function component

// AddEdit function component definition
function AddEdit(props) {
    const user = props?.user; // Destructuring user prop from props object
    const router = useRouter(); // Initializing useRouter hook

    // Form validation rules using Yup schema
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'), // Validation rule for first name field
        lastName: Yup.string().required('Last Name is required'), // Validation rule for last name field
        username: Yup.string().required('Username is required'), // Validation rule for username field
        password: Yup.string() // Validation rule for password field
            .transform(x => x === '' ? undefined : x) // Transform empty string to undefined
            .concat(user ? null : Yup.string().required('Password is required')) // Password is required in registration mode, optional in edit mode
            .min(6, 'Password must be at least 6 characters') // Minimum length for password
    });
    const formOptions = { resolver: yupResolver(validationSchema) }; // Form options for react-hook-form including resolver for validation

    // Set default form values if in edit mode
    if (user) {
        formOptions.defaultValues = props.user; // Setting default form values from user prop
    }

    // Get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions); // Destructuring form functions from useForm hook
    const { errors } = formState; // Destructuring errors from formState

    // Function to handle form submission
    async function onSubmit(data) {
        alertService.clear(); // Clear any previous alerts
        try {
            let message; // Variable to hold success message
            // Create or update user based on user prop
            if (user) {
                await userService.update(user.id, data); // Update user if in edit mode
                message = 'User updated'; // Set success message
            } else {
                await userService.register(data); // Register new user if not in edit mode
                message = 'User added'; // Set success message
            }
            // Redirect to user list with success message
            router.push('/users'); // Redirecting to users page
            alertService.success(message, true); // Show success message alert
        } catch (error) {
            alertService.error(error); // Show error message alert
            console.error(error); // Log error to console
        }
    }

    // Rendering the form
    return (
        <form onSubmit={handleSubmit(onSubmit)}> {/* Form submission handler */}
            <div className="row"> {/* Row container for form fields */}
                <div className="mb-3 col"> {/* First name field */}
                    <label className="form-label">First Name</label>
                    <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
                <div className="mb-3 col"> {/* Last name field */}
                    <label className="form-label">Last Name</label>
                    <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
            </div>
            <div className="row"> {/* Username and password fields */}
                <div className="mb-3 col"> {/* Username field */}
                    <label className="form-label">Username</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="mb-3 col"> {/* Password field */}
                    <label className="form-label">
                        Password
                        {user && <em className="ms-1">(Leave blank to keep the same password)</em>} {/* Password note */}
                    </label>
                    <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
            </div>
            <div className="mb-3"> {/* Form action buttons */}
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2"> {/* Submit button */}
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}{/* Submit button spinner */}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>{/* Reset button */}
                <Link href="/users" className="btn btn-link">Cancel</Link>{/* Cancel button */}
            </div>
        </form> 
    );
}
