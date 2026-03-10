import { useLanguage } from '../lib/LanguageContext';

export default function TrustSection() {
    const { t } = useLanguage();
    const trustItems = t('trust.items', { returnObjects: true }) || [];
    
    // Fallback in case Translation doesn't return objects correctly
    const displayItems = Array.isArray(trustItems) ? trustItems : [
        {
            icon: '🛡️',
            title: t('trust.title_fallback_1') || 'Contenido Verificado',
            desc: t('trust.desc_fallback_1') || 'Material revisado por profesionales en ciberseguridad.'
        },
        {
            icon: '🔒',
            title: t('trust.title_fallback_2') || 'Conexión Segura',
            desc: t('trust.desc_fallback_2') || 'Protección SSL/TLS avanzada.'
        }
    ];

    return (
        <section id="confianza" className="relative py-24 bg-graphite-900 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
            
            <div className="section-container relative z-10">
                <div className="text-center mb-20 animate-slide-up">
                    <span className="px-4 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block border border-green-500/20">
                        {t('trust.badge') || 'Confianza'}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        {t('trust.title') || 'Tecnología moderna y diseño intuitivo'}
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                        {t('trust.subtitle') || 'Una plataforma diseñada para facilitar el aprendizaje con las mejores herramientas.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayItems.map((item, idx) => (
                        <div key={idx} className="group p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-primary-500/30 transition-all duration-500 hover:bg-white/[0.04]">
                            <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary-500/20 transition-all duration-500 text-3xl">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-black text-white mb-4 tracking-tight group-hover:text-primary-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
