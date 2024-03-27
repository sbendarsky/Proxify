import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';

export { NavLink };

NavLink.propTypes = {
    href: PropTypes.string.isRequired,
    exact: PropTypes.bool
};

NavLink.defaultProps = {
    exact: false
};

function NavLink({ children, href, exact, ...props }) {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    // If active, add 'active' class to props.className
    if (isActive) {
        props.className += ' active';
    }

    // Render a Link component with the provided props and children
    return <Link href={href} {...props}>{children}</Link>;
}
