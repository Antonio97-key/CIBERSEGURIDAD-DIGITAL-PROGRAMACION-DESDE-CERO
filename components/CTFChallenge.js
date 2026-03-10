import { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';

export default function CTFChallenge({ challenge }) {
    const { t } = useLanguage();
    const [flag, setFlag] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [error, setError] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const checkFlag = () => {
        if (flag.trim().toLowerCase() === challenge.flag.toLowerCase()) {
            setIsCorrect(true);
            setError(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="my-16 p-1 rounded-3xl bg-gradient-to-br from-red-500/20 via-primary-500/10 to-purple-500/20 shadow-2xl relative overflow-hidden group">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}>
            </div>

            <div className="bg-graphite-900/90 backdrop-blur-xl rounded-[22px] p-8 md:p-12 relative z-10 border border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-4 py-1 rounded-full bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-red-500/20">
                                {t('curriculum_ui.ctf.badge') || 'Desafío CTF'}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-widest border border-white/5">
                                {t('curriculum_ui.ctf.level') || 'Nivel'}: {challenge.difficulty || 'Básico'}
                            </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            {challenge.title}
                        </h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{t('curriculum_ui.ctf.reward') || 'Recompensa'}</span>
                            <span className="text-xl font-black text-yellow-500">+{challenge.points || 100} XP</span>
                        </div>
                    </div>
                </div>

                <div className="mb-10 text-lg leading-relaxed text-gray-400 font-medium">
                    {challenge.description}
                </div>

                {isCorrect ? (
                    <div className="animate-scale-in flex flex-col items-center text-center p-12 bg-green-500/10 border-2 border-green-500/30 rounded-[32px]">
                        <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-2xl shadow-green-500/40">
                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h4 className="text-4xl font-black text-white mb-3 tracking-tight">{t('curriculum_ui.ctf.success') || '¡FLAG CAPTURADA!'}</h4>
                        <p className="text-green-400 font-bold mb-8 uppercase tracking-widest text-sm">{t('curriculum_ui.ctf.success_msg') || 'Has completado este reto con éxito'}</p>
                        <div className="p-6 bg-black/40 rounded-2xl font-mono text-xl border border-white/5 text-gray-300 select-all">
                            {challenge.flag}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-grow group/input relative">
                                <input
                                    type="text"
                                    value={flag}
                                    onChange={(e) => setFlag(e.target.value)}
                                    placeholder={t('curriculum_ui.ctf.placeholder') || 'hack_the_planet{...}'}
                                    className={`w-full bg-black/50 border-2 rounded-2xl p-5 pl-14 font-mono text-lg transition-all outline-none focus:ring-4 focus:ring-blue-500/20 ${
                                        error ? 'border-red-500 animate-shake' : 'border-white/10 focus:border-blue-500 text-white'
                                    }`}
                                />
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-focus-within/input:text-blue-500">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17.001l-2 2H7v2H5v-2l1.414-1.414A6 6 0 1121 9z" />
                                    </svg>
                                </div>
                            </div>
                            <button
                                onClick={checkFlag}
                                className="btn-3d btn-3d-primary py-5 px-10 text-lg font-black min-w-[200px]"
                            >
                                {t('curriculum_ui.ctf.submit') || 'Enviar Flag'}
                            </button>
                        </div>

                        <div className="flex justify-between items-center px-4">
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className="text-gray-500 text-sm font-bold hover:text-white transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {showHint ? (t('curriculum_ui.ctf.hide_hint') || 'Ocultar Pista') : (t('curriculum_ui.ctf.show_hint') || 'Necesito una pista (-50 XP)')}
                            </button>
                            {error && (
                                <span className="text-red-500 font-bold text-sm animate-pulse uppercase tracking-widest">
                                    {t('curriculum_ui.ctf.wrong') || 'Flag Incorrecta'}
                                </span>
                            )}
                        </div>

                        {showHint && (
                            <div className="animate-fade-in p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
                                <p className="text-blue-400 font-medium italic">
                                    <span className="font-black uppercase not-italic mr-2">{t('curriculum_ui.ctf.hint_label') || 'Pista'}:</span> {challenge.hint}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
