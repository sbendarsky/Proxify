import Document, { Html, Head, Main, NextScript } from 'next/document'; // Import Document, Html, Head, Main, and NextScript from next/document

// Define custom Document component
export default CustomDocument;

// CustomDocument component function definition
function CustomDocument() {
    return (
        <Html lang="en"> {/* Set document language */}
            <Head>
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" /> {/* Link Bootstrap CSS */}
            </Head>

            <body>
                <Main /> {/* Render main content */}
                <NextScript /> {/* Render Next.js script */}
            </body>
        </Html>
    );
}
