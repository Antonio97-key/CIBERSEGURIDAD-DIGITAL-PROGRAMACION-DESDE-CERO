import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProjectsDashboard from '../../components/ProjectsDashboard';
import Head from 'next/head';

export default function ProyectosPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary-500/30">
            <Head>
                <title>Laboratorio de Proyectos | Seguridad Digital</title>
            </Head>
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <header className="mb-20 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        Laboratorio Real-World
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 italic">
                        Construye el <span className="gradient-text">Futuro Seguro</span>
                    </h1>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed">
                        Aplica tus conocimientos en retos prácticos. Desde escáneres de red hasta sistemas biométricos, desarrolla herramientas que protejan el mundo digital.
                    </p>
                </header>

                <ProjectsDashboard />

                {/* Growth Section */}
                <div className="mt-32 p-12 md:p-20 rounded-[60px] bg-gradient-to-br from-primary-900/20 to-purple-900/10 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block">
                        <svg className="w-64 h-64 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Expertise Avanzado</h2>
                        <p className="text-lg text-gray-400 font-medium leading-relaxed mb-10">
                            Próximamente: Integración con APIs de inteligencia artificial para auditoría de código automática y despliegue en entornos cloud aislados.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">Cloud Security</span>
                            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">AI Auditing</span>
                            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">Real-Time Labs</span>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
