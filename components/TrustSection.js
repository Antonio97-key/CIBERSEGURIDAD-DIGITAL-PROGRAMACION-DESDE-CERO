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
        <section id="confianza" className="relative py-24 overflow-hidden section-alt">
            {/* Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px" style={{ background: 'linear-gradient(to right, transparent, var(--color-primary), transparent)', opacity: 0.2 }} />
            
            <div className="section-container relative z-10">
                <div className="text-center mb-16 animate-slide-up">
                    <span className="chip chip-green mb-4 inline-flex">
                        🛡️ {t('trust.badge') || 'Confianza'}
                    </span>
                    <h2 className="section-title gradient-text">
                        {t('trust.title') || 'Tecnología moderna y diseño intuitivo'}
                    </h2>
                    <p className="section-subtitle mx-auto">
                        {t('trust.subtitle') || 'Una plataforma diseñada para facilitar el aprendizaje con las mejores herramientas.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayItems.map((item, idx) => (
                        <div key={idx} className="glass-card group p-8">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 text-2xl" style={{ backgroundColor: 'var(--color-badge-bg)' }}>
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-black mb-3 tracking-tight group-hover:text-primary-400 transition-colors" style={{ color: 'var(--color-text)' }}>
                                {item.title}
                            </h3>
                            <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
