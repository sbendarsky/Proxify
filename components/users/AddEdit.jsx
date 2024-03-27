// Importing necessary hooks and components from 'next', 'react-hook-form', 'yup', and 'services'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from 'services';

// Exporting the AddEdit component
export { AddEdit };

// AddEdit is a functional component in React
// It takes one prop: user - the user data to be edited (if any)
function AddEdit(props) {
    // Extracting user from props
    const user = props?.user;
    // Using the useRouter hook to get the router object
    const router = useRouter();

    // Form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            // password optional in edit mode
            .concat(user ? null : Yup.string().required('Password is required'))
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // Set default form values if in edit mode
    if (user) {
        formOptions.defaultValues = props.user;
    }

    // Get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    // Function to handle form submission
    async function onSubmit(data) {
        // Clear any existing alerts
        alertService.clear();
        try {
            // Create or update user based on user prop
            let message;
            if (user) {
                await userService.update(user.id, data);
                message = 'User updated';
            } else {
                await userService.register(data);
                message = 'User added';
            }

            // Redirect to user list with success message
            router.push('/users');
            alertService.success(message, true);
        } catch (error) {
            // Show error alert and log error
            alertService.error(error);
            console.error(error);
        }
    }

    // Render the form
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Form fields for first name, last name, username, and password */}
            {/* Each field has validation error handling */}
            {/* There are also buttons for saving, resetting the form, and cancelling the operation */}
        </form>
    );
}