import { projects } from '../data/projects';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';

export default function ProjectsDashboard() {
    const { t } = useLanguage();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
                <div key={project.id} className="group relative">
                    {/* Background Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-primary-500 to-purple-600 rounded-[32px] opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                    
                    <div className="relative h-full bg-graphite-900 border border-white/5 rounded-[30px] p-8 flex flex-col transition-all duration-500 hover:translate-y-[-8px] hover:shadow-2xl">
                        {/* Status/Badge */}
                        <div className="flex justify-between items-start mb-6">
                            <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-black uppercase tracking-widest text-primary-400 border border-white/5">
                                {t(`projects.level.${project.difficulty.toLowerCase()}`) || project.category}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${project.difficulty === 'Principiante' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                    {t(`projects.level.${project.difficulty.toLowerCase()}`) || project.difficulty}
                                </span>
                            </div>
                        </div>

                        {/* Icon & Title */}
                        <div className="mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mb-4 border border-white/5 group-hover:scale-110 transition-transform">
                                {project.language === 'python' ? (
                                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.25.18l.9.2.73.28.59.35.45.42.34.47.25.51.19.54.11.56.03.66-.03.7-.1.71-.16.75-.24.75-.33.72-.4.71V11h-2V9.43l-.71.4-.71.33-.75.24-.75.16-.71.1-.7.03-.66-.03-.56-.11-.54-.19-.51-.25-.47-.34-.42-.45-.35-.59-.28-.73-.2-.9-.18-1.42.2-1.2.28-1 .35-.83.42-.71.45-.59.59-.45.71-.34.83-.25 1-.19 1.2-.1 1.42-.03c1.3.06 2.49.22 3.59.48zM5 21l.34-.47.45-.42.59-.35.73-.28.9-.2 1.42-.18 1.2.2 1 .28.83.35.71.42.59.45.45.59.34.71.25.83.19 1 .1 1.2.03 1.42-.03.66-.11.56-.19.54-.25.51-.34.47-.42.45-.45.42-.59.35-.71.34-.83.25-1 .19-1.2.1-1.42.03-1.42-.2-1.2-.28-1-.35-.83-.42-.71-.45-.59-.59-.45-.71-.34-.83-.25-1-.19-1.2-.1-1.42-.03z" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 3h18v18H3V3m14.5 13.5c0-.8-.7-1.5-1.5-1.5-.2 0-.4 0-.6.1-.1-1-.9-1.9-2-1.9-1.1 0-2 .9-2 2h-1c0-.6-.4-1-1-1-.6 0-1 .4-1 1s.4 1 1 1h1c1.1 0 2-.9 2-2 0-.1 0-.3.1-.4.2.1.4.1.6.1.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-5.5V18h5.5c1.7 0 3.1-1.4 3.1-3z" />
                                    </svg>
                                )}
                            </div>
                            <h3 className="text-2xl font-black text-white tracking-tight line-clamp-1">
                                {t(`projects_data.${project.id.replace(/-/g, '_')}.title`) || project.title}
                            </h3>
                        </div>

                        {/* Description */}
                        <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 flex-grow">
                            {t(`projects_data.${project.id.replace(/-/g, '_')}.desc`) || project.description}
                        </p>

                        {/* Footer Info */}
                        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {project.estimatedTime}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    {(t(`projects_data.${project.id.replace(/-/g, '_')}.goals`) || project.goals).length} {t('projects.steps') || 'Pasos'}
                                </span>
                            </div>
                            
                            <Link href={`/proyectos/${project.id}`} className="p-2 rounded-xl bg-primary-500/10 text-primary-500 hover:bg-primary-500 hover:text-white transition-all shadow-lg hover:shadow-primary-500/40 translate-x-2 group-hover:translate-x-0">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
