import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';

// Exporting NavLink function component
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

// NavLink function component definition
function NavLink({ children, href, exact, ...props }) {
    const { pathname } = useRouter();
    // Check if the current path matches the NavLink href
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    // Add 'active' class to props.className if NavLink is active
    if (isActive) {
        props.className += ' active';
    }

    // Render Link component with href and children
    return <Link href={href} {...props}>{children}</Link>;
}
