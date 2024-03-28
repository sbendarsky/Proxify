import Link from 'next/link'; // Import Link component from Next.js
import { userService } from 'services'; // Import userService from services module

// Define Home component
export default Home;

// Home component function definition
function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <h1 className="text-4xl font-bold mb-4">Hi {userService.userValue?.firstName}, Welcome to Proxify</h1> {/* Greet user by name */}
                <p className="text-lg mb-6">Proxify is a web application developed as part of our studies at Octopus Computer Solutions Bootcamp.</p> {/* Provide brief introduction to Proxify */}

                <h2 className="text-2xl font-semibold mb-2">Technical Overview</h2> {/* Technical overview section */}
                <p className="mb-4">Proxify leverages the following technologies:</p> {/* Description of technologies used */}
                <ul className="list-disc pl-6 mb-6">
                    <li><strong>Next.js</strong>: A React framework for building server-side rendered (SSR) and statically generated web applications.</li>
                    <li><strong>React</strong>: A JavaScript library for building user interfaces.</li>
                    <li><strong>Proxmox API</strong>: Proxify interacts with the Proxmox Virtual Environment (PVE) through its RESTful API to manage virtual machines.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">Features</h2> {/* Features section */}
                <ul className="list-disc pl-6 mb-6"> {/* List of features */}
                    <li><strong>Node Management</strong>: View existing nodes.</li>
                    <li><strong>Virtual Machine Management</strong>: Control and monitor virtual machines within the Proxmox environment.</li>
                    <li><strong>Provisioning</strong>: Provision new virtual machines directly from the web interface.</li>
                    <li><strong>Logs</strong>: View and analyze logs for troubleshooting purposes.</li>
                    <li><strong>Image Management</strong>: Manage disk images for virtual machines.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">Usage</h2> {/* Usage section */}
                <p className="mb-4">Once the application is running, you can navigate through the user interface to perform various tasks such as viewing nodes, virtual machines, provisioning, viewing logs, and managing images.</p> {/* Description of application usage */}

                <h2 className="text-2xl font-semibold mb-2">Contributing</h2> {/* Contributing section */}
                <p>Contributions to Proxify are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.</p> {/* Invitation for contributions */}
            </div>
        </div>
    );
}
