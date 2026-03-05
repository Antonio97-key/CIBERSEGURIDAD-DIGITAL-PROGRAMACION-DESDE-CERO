import { useLanguage } from '../lib/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: t('footer.col1'),
            links: [
                { label: t('header.nav.cyber'), href: '#cyber' },
                { label: t('header.nav.prog'), href: '#prog' },
                { label: t('header.nav.projects'), href: '#integracion' },
                { label: t('header.nav.resources'), href: '#recursos' },
            ],
        },
        {
            title: t('footer.col2'),
            links: [
                { label: t('header.nav.community'), href: '#comunidad' },
                { label: t('footer.links.contribute'), href: '#' },
                { label: t('footer.links.faq'), href: '#' },
            ],
        },
        {
            title: t('footer.col3'),
            links: [
                { label: t('footer.links.privacy'), href: '#' },
                { label: t('footer.links.terms'), href: '#' },
                { label: t('footer.links.cookies'), href: '#' },
            ],
        },
    ];

    return (
        <footer className="relative" style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
            {/* Decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px opacity-50" style={{ background: 'var(--gradient-primary)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-sm font-bold gradient-text">SEGURIDAD DIGITAL</span>
                                <span className="block text-[10px] font-medium tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
                                    + Programación desde Cero
                                </span>
                            </div>
                        </div>
                        <p className="text-sm max-w-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
                            {t('footer.desc')}
                        </p>
                        {/* Social */}
                        <div className="flex items-center gap-3">
                            {['Twitter', 'GitHub'].map((name) => (
                                <a
                                    key={name}
                                    href="#"
                                    className="w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                                    style={{ backgroundColor: 'var(--color-surface-hover)', border: '1px solid var(--color-border)' }}
                                    aria-label={name}
                                >
                                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                        {name === 'Twitter' ? '𝕏' : '⌨'}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text)' }}>
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="text-sm hover:underline transition-colors duration-200" style={{ color: 'var(--color-text-muted)' }}>
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        © {currentYear} SEGURIDAD DIGITAL. {t('footer.rights')}
                    </p>
                    <p className="text-xs flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
                        {t('footer.made_with')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
