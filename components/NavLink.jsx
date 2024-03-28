import { useRouter } from 'next/router'; // Importing useRouter hook from Next.js router
import Link from 'next/link'; // Importing Link component from Next.js
import PropTypes from 'prop-types'; // Importing PropTypes for defining prop types

// Exporting NavLink component
export { NavLink };

// PropTypes for NavLink component
NavLink.propTypes = {
    href: PropTypes.string.isRequired, // href prop is required and must be a string
    exact: PropTypes.bool // exact prop is optional and must be a boolean
};

// Default props for NavLink component
NavLink.defaultProps = {
    exact: false // Default value for exact prop is false
};

// NavLink component definition
function NavLink({ children, href, exact, ...props }) {
    const { pathname } = useRouter(); // Getting the current pathname using useRouter hook
    const isActive = exact ? pathname === href : pathname.startsWith(href); // Checking if the NavLink is active

    // Adding 'active' class to the NavLink if it is active
    if (isActive) {
        props.className += ' active';
    }

    // Rendering the NavLink using Next.js Link component
    return <Link href={href} {...props}>{children}</Link>;
}