import { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { supabase } from '../lib/supabase';
import { siteConfig } from '../data/siteConfig';
import PolicyModal from './PolicyModal';

export default function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();
    const [activePolicy, setActivePolicy] = useState(null);
    const [dynamicLinks, setDynamicLinks] = useState(null);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const { data } = await supabase.from('platform_settings').select('value').eq('id', 'social_links').single();
                if (data && data.value) {
                    // Filter out empty or '#' links
                    const activeLinks = Object.entries(data.value)
                        .filter(([_, url]) => url && url !== '#' && url.length > 5)
                        .map(([id, url]) => ({ id, name: id.charAt(0).toUpperCase() + id.slice(1), url }));
                    setDynamicLinks(activeLinks);
                }
            } catch (e) {
                console.error("Error fetching social links:", e);
            }
        };
        fetchLinks();
    }, []);

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
            case 'discord': return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.461-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>;
            case 'whatsapp': return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>;
            default: return <span>{id}</span>;
        }
    };

    const displayLinks = dynamicLinks || siteConfig.socialLinks;

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
                                    <span className="text-xl font-black gradient-text tracking-tighter uppercase">Ciberseguridad Digital</span>
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
                                {displayLinks.map((social) => (
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
                    <div className="flex flex-col md:flex-row items-center gap-4 text-xs font-bold text-gray-500">
                        <p>© {currentYear} Ciberseguridad Digital. Todos los derechos reservados.</p>
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
