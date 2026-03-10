import { useRouter } from 'next/router';
import { projects } from '../../data/projects';
import { useAuth } from '../../lib/AuthContext';
import CodePlayground from '../../components/CodePlayground';
import Paywall from '../../components/Paywall';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Head from 'next/head';

export default function ProjectWorkspace() {
    const router = useRouter();
    const { user } = useAuth();
    const { id } = router.query;
    const project = projects.find(p => p.id === id);

    if (!project) return null;

    // Simulated premium check: if not logged in and difficulty > Beginner
    const showPaywall = project.difficulty !== 'Principiante' && !user;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary-500/30">
            <Head>
                <title>{project.title} | Workspace</title>
            </Head>
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Project Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-500 text-[10px] font-black uppercase tracking-widest border border-primary-500/20">
                            Fase 5: Proyecto {project.difficulty}
                        </span>
                        <div className="h-px flex-grow bg-white/5"></div>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">{project.title}</h1>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
                        {project.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Sidebar: Instructions */}
                    <div className="space-y-8">
                        <section className="bg-graphite-900 border border-white/5 rounded-[40px] p-8">
                            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center text-xs">1</span>
                                Objetivos del Proyecto
                            </h3>
                            <ul className="space-y-4">
                                {project.goals.map((goal, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0"></div>
                                        <span className="text-gray-400 text-sm font-medium leading-relaxed">{goal}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="bg-primary-500/5 border border-primary-500/10 rounded-[40px] p-8">
                            <h3 className="text-xl font-black mb-6 text-primary-400">Pista Técnica</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                {project.language === 'python' 
                                    ? "Utiliza 'socket.socket()' para crear una conexión y '.connect_ex()' para verificar el puerto sin lanzar excepciones."
                                    : "Para el validador, usa '.test()' de una RegExp para verificar patrones complejos rápidamente."}
                            </p>
                        </section>
                    </div>

                    {/* Editor Area */}
                    <div className="lg:col-span-2 space-y-8 relative">
                        {showPaywall && <Paywall difficulty={project.difficulty} />}
                        
                        <div className={`bg-graphite-900 border border-white/5 rounded-[40px] overflow-hidden shadow-2xl transition-all ${showPaywall ? 'blur-sm pointer-events-none grayscale' : ''}`}>
                            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="ml-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                        workspace/{project.id}.{project.language === 'python' ? 'py' : 'js'}
                                    </span>
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-primary-500 px-3 py-1 bg-primary-500/10 rounded-lg">
                                    {project.language}
                                </div>
                            </div>
                            
                            <CodePlayground 
                                language={project.language}
                                title={project.title}
                                initialCode={project.language === 'python' 
                                    ? `# Escribe tu código aquí\nimport socket\n\ntarget = "127.0.0.1"\nports = [80, 443]\n# ...`
                                    : `// Escribe tu código aquí\nfunction validate(pass) {\n  return pass.length > 8;\n}\nconsole.log(validate("123456789"));`}
                            />
                        </div>

                        {/* Submission Area */}
                        <div className="p-8 bg-white/5 rounded-[40px] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h4 className="text-lg font-black text-white">¿Proyecto terminado?</h4>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Sube tu solución para revisión comunitaria</p>
                            </div>
                            <button className="w-full md:w-auto px-10 py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-all shadow-xl active:scale-95">
                                Publicar Proyecto
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
