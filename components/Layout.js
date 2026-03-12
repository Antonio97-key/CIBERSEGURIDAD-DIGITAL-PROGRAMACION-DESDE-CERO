import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';

export default function Layout({ children }) {
    const router = useRouter();
    
    // Rutas que no usan el layout de documentación (landing page, login, etc)
    const isDocPage = router.pathname.startsWith('/ciberseguridad') || 
                      router.pathname.startsWith('/programacion') ||
                      router.pathname.startsWith('/proyectos') ||
                      router.pathname.startsWith('/ejercicios');

    if (!isDocPage) {
        // Para la index.js y otras páginas sueltas
        return (
            <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
                <Head>
                    <title>Ciberseguridad Digital</title>
                </Head>
                {children}
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-background)' }}>
            <Header />
            
            <div className="flex-1 flex w-full max-w-8xl mx-auto pt-[80px]"> {/* padding-top para el fixed header */}
                <Sidebar />
                
                <main className="flex-1 flex flex-col min-w-0" style={{ backgroundColor: 'var(--color-background)' }}>
                    <div className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                        <Breadcrumbs />
                        <div className="mt-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
            
            <Footer />
        </div>
    );
}
