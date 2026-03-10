import { useLanguage } from '../lib/LanguageContext';

export default function TrustSection() {
    const { t } = useLanguage();
    const badges = [
        {
            icon: '🛡️',
            title: 'Contenido Verificado',
            description: 'Material revisado por profesionales en ciberseguridad y desarrollo.',
        },
        {
            icon: '🔒',
            title: 'Conexión Segura',
            description: 'Sitio protegido con SSL/TLS y headers de seguridad avanzados.',
        },
        {
            icon: '💎',
            title: 'Certificación VIP',
            description: 'Obtén certificados de nivel profesional al completar proyectos avanzados.',
        },
        {
            icon: '🎓',
            title: 'Aprendizaje Práctico',
            description: 'Proyectos reales y ejercicios interactivos, no solo teoría.',
        },
    ];

    return (
        <section id="confianza" className="relative py-20 section-alt">
            <div className="section-container">
                <div className="text-center mb-16">
                    <span className="chip chip-green mb-4 inline-flex">✅ {t('trust.badge')}</span>
                    <h2 className="section-title gradient-text">{t('trust.title')}</h2>
                    <p className="section-subtitle mx-auto">
                        {t('trust.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {badges.map((badge, idx) => (
                        <div key={idx} className="glass-card p-6 text-center group hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300">
                            <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform duration-300">
                                {badge.icon}
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">{badge.title}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{badge.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
