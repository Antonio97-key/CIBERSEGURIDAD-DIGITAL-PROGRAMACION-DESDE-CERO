import { useAuth } from '../lib/AuthContext';
import { useRouter } from 'next/router';

export default function Paywall({ difficulty }) {
    const { user } = useAuth();
    const router = useRouter();

    if (difficulty === 'Principiante') return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-all duration-700"></div>
            
            <div className="relative w-full max-w-xl bg-graphite-900 border border-primary-500/30 rounded-[60px] p-12 text-center shadow-[0_0_100px_rgba(59,130,246,0.15)] overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="w-20 h-20 rounded-[30px] bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary-500/20">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-500 mb-4 block">Contenido de Élite</span>
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-6 leading-tight">
                        Este laboratorio requiere <br />
                        <span className="gradient-text italic">Acceso Premium</span>
                    </h2>
                    
                    <p className="text-gray-400 font-medium mb-10 leading-relaxed max-w-sm mx-auto">
                        Los desafíos de nivel <span className="text-white font-bold">{difficulty}</span> están reservados para nuestra comunidad de expertos. Desbloquea herramientas de grado militar hoy mismo.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => router.push('/#planes')}
                            className="px-10 py-5 rounded-2xl bg-primary-500 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-primary-400 transition-all shadow-xl shadow-primary-500/20 active:scale-95"
                        >
                            Ver Planes Premium
                        </button>
                        <button 
                            onClick={() => router.back()}
                            className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95"
                        >
                            Volver Atrás
                        </button>
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-5" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                    </div>
                </div>
            </div>
        </div>
    );
}
