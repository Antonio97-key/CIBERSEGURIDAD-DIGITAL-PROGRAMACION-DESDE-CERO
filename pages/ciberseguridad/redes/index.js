import Head from 'next/head';
import Link from 'next/link';

export default function RedesModule() {
    return (
        <>
            <Head>
                <title>Fundamentos de Redes | Seguridad Digital</title>
            </Head>
            
            <div className="prose prose-invert max-w-none">
                <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
                    Fundamentos de Redes
                </h1>
                
                <p className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
                    Comprender cómo viaja la información desde tu dispositivo hasta un servidor en el otro lado del mundo es el primer paso esencial en ciberseguridad. En este módulo exploraremos los conceptos fundamentales de redes, protocolos y sus vulnerabilidades iniciales.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                    <Link href="/ciberseguridad/redes/modelo-osi" 
                       className="p-6 rounded-2xl transition-all duration-300 hover:scale-105 group border"
                       style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold shadow-lg">
                                1
                            </div>
                            <h3 className="text-xl font-semibold m-0" style={{ color: 'var(--color-text)' }}>El Modelo OSI</h3>
                        </div>
                        <p className="m-0 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            Las 7 capas de red explicadas.
                        </p>
                    </Link>

                    <Link href="/ciberseguridad/redes/tcp-ip" 
                       className="p-6 rounded-2xl transition-all duration-300 hover:scale-105 group border"
                       style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold shadow-lg">
                                2
                            </div>
                            <h3 className="text-xl font-semibold m-0" style={{ color: 'var(--color-text)' }}>TCP/IP en profundidad</h3>
                        </div>
                        <p className="m-0 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            El handshake de 3 vías, flags, estados.
                        </p>
                    </Link>
                </div>
            </div>
        </>
    );
}
