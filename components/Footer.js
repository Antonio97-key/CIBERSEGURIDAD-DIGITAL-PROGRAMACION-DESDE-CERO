import { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { siteConfig } from '../data/siteConfig';
import PolicyModal from './PolicyModal';

export default function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();
    const [activePolicy, setActivePolicy] = useState(null);

    const footerLinks = [
        {
            title: t('footer.col1') || 'Explorar',
            links: [
                { label: t('header.nav.cyber') || 'Ciberseguridad', href: '#cyber' },
                { label: t('header.nav.prog') || 'Programación', href: '#prog' },
                { label: t('header.nav.projects') || 'Proyectos', href: '#integracion' },
                { label: t('header.nav.resources') || 'Recursos', href: '#recursos' },
            ],
        },
        {
            title: t('footer.col2') || 'Comunidad',
            links: [
                { label: t('header.nav.community') || 'Foro Hacker', href: '#comunidad' },
                { label: t('footer.links.contribute') || 'Contribuir', href: '#' },
                { label: t('footer.links.faq') || 'Preguntas Frecuentes', href: '#' },
            ],
        },
        {
            title: t('footer.col3') || 'Legal & Soporte',
            links: [
                { 
                    label: t('policies.privacy.title') || 'Privacidad', 
                    action: () => setActivePolicy({
                        title: t('policies.privacy.title'),
                        content: [
                            t('policies.privacy.p1'),
                            t('policies.privacy.p2'),
                            t('policies.privacy.p3'),
                            t('policies.privacy.p4')
                        ].filter(Boolean)
                    }) 
                },
                { 
                    label: t('policies.terms.title') || 'Términos', 
                    action: () => setActivePolicy({
                        title: t('policies.terms.title'),
                        content: [
                            t('policies.terms.p1'),
                            t('policies.terms.p2'),
                            t('policies.terms.p3'),
                            t('policies.terms.p4')
                        ].filter(Boolean)
                    }) 
                },
                { 
                    label: t('policies.cookies.title') || 'Cookies', 
                    action: () => setActivePolicy({
                        title: t('policies.cookies.title'),
                        content: [
                            t('policies.cookies.p1'),
                            t('policies.cookies.p2'),
                            t('policies.cookies.p3'),
                            t('policies.cookies.p4')
                        ].filter(Boolean)
                    }) 
                },
            ],
        },
    ];

    const getSocialIcon = (id) => {
        switch(id) {
            case 'instagram': return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
            case 'tiktok': return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>;
            case 'facebook': return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>;
            case 'github': return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
            default: return <span>{id}</span>;
        }
    };

    return (
        <footer className="relative overflow-hidden" style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
            {/* Background elements */}
            <div className="absolute top-0 left-0 right-0 h-px opacity-50" style={{ background: 'var(--gradient-primary)' }} />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-500/5 blur-[100px] rounded-full"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/5 blur-[100px] rounded-full"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
                    {/* Brand & Social */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-xl shadow-primary-500/20">
                                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-xl font-black gradient-text tracking-tighter uppercase">Seguridad Digital</span>
                                    <span className="block text-[10px] font-black tracking-[0.3em] uppercase opacity-50">
                                        + Prog. desde Cero
                                    </span>
                                </div>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-500 font-medium max-w-sm">
                                {t('footer.desc') || 'Potenciando la próxima generación de defensores digitales con educación técnica de alto impacto.'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500">Síguenos en Redes</h4>
                            <div className="flex items-center gap-4">
                                {siteConfig.socialLinks.map((social) => (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-primary-500 hover:border-primary-400 hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-primary-500/20"
                                        aria-label={social.name}
                                    >
                                        {getSocialIcon(social.id)}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Links Groups */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white">
                                {section.title}
                            </h3>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        {link.action ? (
                                            <button 
                                                onClick={link.action}
                                                className="text-base font-medium text-gray-500 hover:text-primary-400 transition-colors duration-200"
                                            >
                                                {link.label}
                                            </button>
                                        ) : (
                                            <a 
                                                href={link.href} 
                                                className="text-base font-medium text-gray-500 hover:text-primary-400 transition-colors duration-200"
                                            >
                                                {link.label}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-xs font-bold text-gray-600">
                        <p>© {currentYear} SEGURIDAD DIGITAL. Todos los derechos reservados.</p>
                        <div className="hidden md:block w-1 h-1 rounded-full bg-gray-800"></div>
                        <p className="uppercase tracking-widest text-[9px]">Sovereign Tech Ed.</p>
                    </div>
                    
                    <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/5 text-xs font-black text-primary-500 uppercase tracking-widest">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        System v2.6 Online
                    </div>
                </div>
            </div>

            {/* Global Legal Modal */}
            <PolicyModal 
                isOpen={!!activePolicy} 
                onClose={() => setActivePolicy(null)} 
                policy={activePolicy}
            />
        </footer>
    );
}
