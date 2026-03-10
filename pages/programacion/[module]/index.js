import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { curriculum } from '../../../data/curriculum';

export default function ProgrammingModuleIndex() {
    const router = useRouter();
    const { module } = router.query;

    if (!module || !curriculum.programacion[module]) {
        return <div className="p-8 text-center">Cargando módulo de programación...</div>;
    }

    const modData = curriculum.programacion[module];

    return (
        <>
            <Head>
                <title>{modData.title} | Programación</title>
            </Head>
            
            <div className="prose prose-invert max-w-none animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white shadow-lg">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <h1 className="text-4xl font-bold m-0" style={{ color: 'var(--color-primary)' }}>
                        {modData.title}
                    </h1>
                </div>
                
                <p className="text-lg mb-10" style={{ color: 'var(--color-text-muted)' }}>
                    {modData.description}
                </p>

                <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>
                    Curriculum del Lenguaje
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {modData.lessons.map((lesson, idx) => (
                        <Link key={lesson.id} href={`/programacion/${module}/${lesson.id}`}
                           className="p-6 rounded-2xl transition-all duration-300 hover:scale-105 group border relative overflow-hidden"
                           style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                            
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-primary)' }}>
                                        {idx + 1}
                                    </div>
                                    <h3 className="text-xl font-semibold m-0" style={{ color: 'var(--color-text)' }}>{lesson.title}</h3>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 mt-4">
                                <span className="text-xs font-medium px-2.5 py-1 rounded-md" style={{ backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-muted)' }}>
                                    Lectura estim.: {lesson.readingTime}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
