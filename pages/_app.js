import { ThemeProvider } from '../lib/ThemeContext';
import { LanguageProvider } from '../lib/LanguageContext';
import { AuthProvider } from '../lib/AuthContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { DefaultSeo } from 'next-seo';
import Layout from '../components/Layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <LanguageProvider>
            <AuthProvider>
                <ThemeProvider>
                    <DefaultSeo
                        title="Seguridad Digital + Programación desde Cero"
                        description="Aprende ciberseguridad y programación básica con ejemplos prácticos, herramientas gratuitas y proyectos reales. Recurso educativo para principiantes."
                        canonical="https://seguridad-digital.vercel.app"
                        openGraph={{
                            type: 'website',
                            locale: 'es_DO',
                            url: 'https://seguridad-digital.vercel.app',
                            siteName: 'Seguridad Digital + Programación desde Cero',
                            title: 'Seguridad Digital + Programación desde Cero',
                            description: 'Aprende ciberseguridad y programación básica con ejemplos prácticos.',
                            images: [
                                {
                                    url: '/og-image.jpg',
                                    width: 1200,
                                    height: 630,
                                    alt: 'Seguridad Digital + Programación desde Cero',
                                },
                            ],
                        }}
                        additionalMetaTags={[
                            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                            { name: 'keywords', content: 'ciberseguridad, programación, principiantes, python, javascript, seguridad digital' },
                            { name: 'author', content: 'Seguridad Digital' },
                            { name: 'theme-color', content: '#3b82f6' },
                        ]}
                        additionalLinkTags={[
                            { rel: 'manifest', href: '/manifest.json' },
                            { rel: 'icon', href: '/favicon.ico' }
                        ]}
                    />
                    <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test", currency: "USD" }}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </PayPalScriptProvider>
                </ThemeProvider>
            </AuthProvider>
        </LanguageProvider>
    );
}
