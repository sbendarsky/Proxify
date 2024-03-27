// Importing necessary components from 'next/document'
import { Html, Head, Main, NextScript } from 'next/document'

// Exporting the default function for this component
export default Document;

function Document() {
    // The Document component is a custom document configuration in Next.js
    // It is used to augment the application's <html> and <body> tags
    return (
        // Setting the language of the document to English
        <Html lang="en">
            <Head>
                {/* Importing the Bootstrap CSS from a CDN */}
                {/* The eslint-disable-next-line comment is used to disable the linting warning for the next line */}
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" />
            </Head>

            <body>
                {/* The Main component is a Next.js component that gets replaced with the page content */}
                <Main />
                {/* The NextScript component is a Next.js component that gets replaced with the necessary JavaScript scripts */}
                <NextScript />
            </body>
        </Html>
    );
}