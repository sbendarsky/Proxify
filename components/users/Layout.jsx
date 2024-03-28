// Exporting Layout function component
export { Layout };

// Layout function component definition
function Layout({ children }) {
    return (
        <div className="p-4"> {/* Padding */}
            <div className="container"> {/* Container for content */}
                {children} {/* Render children components */}
            </div>
        </div>
    );
}