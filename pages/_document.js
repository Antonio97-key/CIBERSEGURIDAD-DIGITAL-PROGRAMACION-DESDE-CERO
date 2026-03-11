import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="es">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
                <meta name="theme-color" content="#3A7AFE" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body className="antialiased">
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var savedTheme = localStorage.getItem('sd-theme');
                                    if (savedTheme === 'light' || savedTheme === 'dark') {
                                        document.documentElement.setAttribute('data-theme', savedTheme);
                                        if (savedTheme === 'dark') document.documentElement.classList.add('dark');
                                        else document.documentElement.classList.remove('dark');
                                    } else {
                                        document.documentElement.setAttribute('data-theme', 'light');
                                        document.documentElement.classList.remove('dark');
                                        localStorage.setItem('sd-theme', 'light');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
