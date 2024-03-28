// Exporting Spinner component
export { Spinner };

// Spinner component definition
function Spinner() {
    // Rendering a spinner component in the center of the page
    return (
        <div className="text-center p-4">
            <span className="spinner-border spinner-border-lg align-center"></span>
        </div>
    );
}
