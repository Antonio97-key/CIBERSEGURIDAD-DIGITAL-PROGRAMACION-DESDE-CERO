import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../../../lib/AuthContext';
import { curriculum, getLessonContent } from '../../../data/curriculum';
import NavigationButtons from '../../../components/NavigationButtons';
import CodeBlock from '../../../components/CodeBlock';
import LessonQuiz from '../../../components/LessonQuiz';
import CTFChallenge from '../../../components/CTFChallenge';
import CodePlayground from '../../../components/CodePlayground';

export default function LessonPage() {
    const router = useRouter();
    const { user, progress, updateProgress } = useAuth();
    const { module, lesson } = router.query;

    const isCompleted = progress.lessons?.includes(`${module}/${lesson}`);

    const handleComplete = () => {
        if (isCompleted || !user) return;
        const newLessons = [...(progress.lessons || []), `${module}/${lesson}`];
        updateProgress({ 
            lessons: newLessons,
            xp: (progress.xp || 0) + 100
        });
    };

    if (!module || !lesson || !curriculum.programacion[module]) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium animate-pulse">Compilando el conocimiento...</p>
            </div>
        );
    }

    const modData = curriculum.programacion[module];
    const lessonData = modData.lessons.find(l => l.id === lesson);
    
    if (!lessonData) {
        return <div className="p-20 text-center text-2xl font-bold opacity-50">⚠️ Lección no encontrada</div>;
    }

    const content = getLessonContent(module, lesson);
    
    const currentIndex = modData.lessons.findIndex(l => l.id === lesson);
    const prevLesson = currentIndex > 0 ? modData.lessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < modData.lessons.length - 1 ? modData.lessons[currentIndex + 1] : null;

    const prev = prevLesson ? { title: prevLesson.title, path: `/programacion/${module}/${prevLesson.id}` } : null;
    const next = nextLesson ? { title: nextLesson.title, path: `/programacion/${module}/${nextLesson.id}` } : null;

    // Parser de contenido premium (Markdown-lite)
    const renderContent = () => {
        const parts = content.split(/```/);
        return parts.map((part, index) => {
            if (index % 2 === 1) {
                const lines = part.split('\n');
                const lang = lines[0].trim() || 'javascript';
                const code = lines.slice(1).join('\n').trim();
                return <CodeBlock key={index} code={code} language={lang} />;
            }
            return (
                <div key={index} className="space-y-6">
                    {part.split('\n').map((line, i) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        
                        if (trimmed.startsWith('## ')) {
                            return <h2 key={i} className="text-3xl font-black mt-16 mb-8 text-white border-b border-white/5 pb-4 tracking-tight">
                                {trimmed.replace('## ', '')}
                            </h2>;
                        }
                        if (trimmed.startsWith('### ')) {
                            return <h3 key={i} className="text-xl font-bold mt-10 mb-4 text-purple-400">
                                {trimmed.replace('### ', '')}
                            </h3>;
                        }
                        if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
                            return <li key={i} className="ml-6 text-gray-400 list-disc marker:text-purple-500 transition-colors hover:text-gray-300">{trimmed.substring(2)}</li>;
                        }
                        if (/^\d+\./.test(trimmed)) {
                            return <li key={i} className="ml-6 text-gray-400 list-decimal marker:text-purple-500 marker:font-black">{trimmed.replace(/^\d+\.\s*/, '')}</li>;
                        }
                        
                        const bolded = trimmed.split(/(\*\*.*?\*\*)/).map((segment, j) => {
                            if (segment.startsWith('**') && segment.endsWith('**')) {
                                return <strong key={j} className="text-white font-bold">{segment.slice(2, -2)}</strong>;
                            }
                            return segment;
                        });

                        return <p key={i} className="text-lg leading-relaxed text-gray-400 font-medium">{bolded}</p>;
                    })}
                </div>
            );
        });
    };

    return (
        <>
            <Head>
                <title>{lessonData.title} | {modData.title}</title>
            </Head>
            
            <div className="max-w-4xl mx-auto py-12 px-6 animate-fade-in">
                <header className="mb-16 border-b border-white/5 pb-12">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl" 
                            style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-primary)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                            Módulo {currentIndex + 1}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-bold bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            {lessonData.readingTime} de práctica intensiva
                        </div>
                    </div>
                    
                    <h1 className="text-6xl font-black mb-8 tracking-tighter leading-[1.1] text-white">
                        {lessonData.title}
                    </h1>
                    
                    <div className="flex items-center gap-3 text-gray-500 font-medium">
                        <span>Aprenderás</span>
                        <div className="h-px w-8 bg-white/10"></div>
                        <span className="text-purple-500 font-bold uppercase tracking-wider text-sm">{modData.title}</span>
                    </div>
                </header>
                
                <article className="prose prose-invert max-w-none">
                    {renderContent()}
                </article>

                {lessonData.quiz && (
                    <div className="mt-20">
                        <LessonQuiz quiz={lessonData.quiz} />
                    </div>
                )}

                {lessonData.challenge && (
                    <div className="mt-10">
                        <CTFChallenge challenge={lessonData.challenge} />
                    </div>
                )}

                {lessonData.playground && (
                    <div className="mt-20">
                        <div className="mb-8">
                            <h3 className="text-2xl font-black text-white mb-2">Laboratorio Interactivo</h3>
                            <p className="text-gray-500 font-medium">Modifica el código y observa los resultados en tiempo real.</p>
                        </div>
                        <CodePlayground 
                            language={lessonData.playground.language || 'javascript'} 
                            initialCode={lessonData.playground.initialCode}
                            title={lessonData.playground.title || 'Editor de Práctica'}
                        />
                    </div>
                )}

                <div className="mt-24 pt-12 border-t border-white/5">
                    <div className="mb-12 flex flex-col items-center">
                        <button 
                            onClick={handleComplete}
                            disabled={isCompleted || !user}
                            className={`group relative px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all overflow-hidden ${isCompleted ? 'bg-green-500/10 border border-green-500/30 text-green-500 cursor-default' : 'bg-primary-500 text-white hover:bg-primary-400 active:scale-95 shadow-2xl shadow-primary-500/20'}`}
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                {isCompleted ? '✓ Lección Completada' : 'Marcar como Completada (+100 XP)'}
                            </span>
                            {!isCompleted && <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>}
                        </button>
                        {!user && <p className="mt-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Inicia sesión para guardar tu progreso</p>}
                    </div>

                    <div className="mb-8 text-center">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Continúa tu aprendizaje</p>
                        <div className="h-1 w-12 bg-purple-500 mx-auto rounded-full"></div>
                    </div>
                    <NavigationButtons prev={prev} next={next} />
                </div>
            </div>
        </>
    );
}
