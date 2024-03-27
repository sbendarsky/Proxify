// Exporting the Spinner component
export { Spinner };

// Spinner is a functional component in React
function Spinner() {
    // The component returns a div with a spinner
    return (
        // A div with classes for text-center and padding
        <div className="text-center p-4">
            // A span with classes for a large spinner and alignment
            <span className="spinner-border spinner-border-lg align-center"></span>
        </div>
    );
}