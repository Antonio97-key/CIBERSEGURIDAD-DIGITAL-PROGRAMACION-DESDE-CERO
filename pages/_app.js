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
                        title="Ciberseguridad Digital"
                        description="Domina la ciberseguridad avanzada con metodologías profesionales, laboratorios de élite y proyectos reales de alto nivel."
                        canonical="https://ciberseguridad-digital-programacion.vercel.app"
                        openGraph={{
                            type: 'website',
                            locale: 'es_DO',
                            url: 'https://ciberseguridad-digital-programacion.vercel.app',
                            siteName: 'Ciberseguridad Digital',
                            title: 'Ciberseguridad Digital',
                            description: 'Domina la ciberseguridad avanzada con metodologías profesionales y laboratorios de élite.',
                            images: [
                                {
                                    url: '/og-image.jpg',
                                    width: 1200,
                                    height: 630,
                                    alt: 'Ciberseguridad Digital',
                                },
                            ],
                        }}
                        additionalMetaTags={[
                            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                            { name: 'keywords', content: 'ciberseguridad avanzada, programación profesional, hacking ético, laboratorios de élite, seguridad digital premium' },
                            { name: 'author', content: 'Ciberseguridad Digital' },
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
