// Exporting Spinner function component
export { Spinner };

// Spinner function component definition
function Spinner() {
    return (
        // Container with text center alignment and padding
        <div className="text-center p-4">
            {/* Spinner icon */}
            <span className="spinner-border spinner-border-lg align-center"></span>
        </div>
    );
}