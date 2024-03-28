// Export the Layout component
export { Layout };

// Define the Layout component which wraps its children in a container div
function Layout({ children }) {
    return (
        // Outer container with padding
        <div className="p-4">
            {/* Inner container */}
            <div className="container">
                {/* Render children components */}
                {children}
            </div>
        </div>
    );
}