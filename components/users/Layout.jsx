// Exporting the Layout component
export { Layout };

// Layout is a functional component in React
// It takes one prop: children - the components that are passed into this Layout component
function Layout({ children }) {
    // The component returns a div that wraps the children components
    return (
        // Outer div with padding
        <div className="p-4">
            // Inner div that acts as a container for the children components
            <div className="container">
                {children} // Rendering the children components
            </div>
        </div>
    );
}