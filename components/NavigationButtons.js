import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavigationButtons({ prev, next }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-16 pt-12 border-t border-white/5">
            {prev ? (
                <Link href={prev.path}
                   className="w-full md:w-[48%] group relative p-0.5 rounded-[22px] bg-gradient-to-br from-white/10 to-transparent transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <div className="bg-graphite-900 rounded-[20px] p-6 flex items-center gap-5 border border-white/5 shadow-2xl transition-all group-hover:bg-graphite-800">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors">
                            <svg className="w-6 h-6 text-gray-500 group-hover:text-blue-400 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1 group-hover:text-blue-500/80 transition-colors">
                                Lección Anterior
                            </span>
                            <span className="font-bold text-white text-lg tracking-tight line-clamp-1">{prev.title}</span>
                        </div>
                    </div>
                </Link>
            ) : (
                <div className="hidden md:block w-[48%]"></div>
            )}

            {next ? (
                <Link href={next.path}
                   className="w-full md:w-[48%] group relative p-0.5 rounded-[22px] bg-gradient-to-br from-blue-500/40 to-purple-600/40 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20">
                    <div className="bg-blue-600 rounded-[20px] p-6 flex items-center justify-between border border-white/10 group-hover:bg-blue-500 transition-all">
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1">
                                Siguiente Lección
                            </span>
                            <span className="font-bold text-white text-lg tracking-tight line-clamp-1">{next.title}</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center border border-white/20">
                            <svg className="w-6 h-6 text-white transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </Link>
            ) : (
                <div className="hidden md:block w-[48%]"></div>
            )}
        </div>
    );
}
