import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../lib/LanguageContext';

export default function CategoryNav() {
    const router = useRouter();
    const { t } = useLanguage();
    const scrollContainerRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Se activa el estado scrolled cuando bajamos más de la altura del Header principal (aprox 80px)
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t('header.nav.home') || 'Inicio', href: '#hero' },
        { name: 'Laboratorio', href: '/playground' },
        { name: t('header.nav.projects') || 'Proyectos', href: '/proyectos' },
        { name: t('header.nav.cyber') || 'Ciberseguridad', href: '#cyber' },
        { name: t('header.nav.prog') || 'Programación', href: '#prog' },
        { name: t('header.nav.news') || 'Noticias', href: '#noticias' },
        { name: t('header.nav.trust') || 'Confianza', href: '#confianza' },
        { name: t('header.nav.community') || 'Comunidad', href: '#comunidad' },
    ];

    const handleNavClick = (e, href) => {
        if (href.startsWith('/')) {
            return;
        }
        e.preventDefault();

        if (router.pathname !== '/' && href.startsWith('#')) {
            router.push('/' + href);
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            // Compensate for both headers
            const headerOffset = 130;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div 
            className={`sticky z-40 transition-all duration-300 border-y shadow-sm`}
            style={{ 
                top: scrolled ? '75px' : '0px', // Dock just below the main header when scrolling
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                // Añadimos un extra shadow cuando está scrolled para q resalte más
                boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.15)' : 'none'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav 
                    ref={scrollContainerRef}
                    className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 hide-scrollbar"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="whitespace-nowrap px-4 py-2 text-sm font-bold rounded-full transition-all duration-200"
                            style={{ 
                                color: 'var(--color-text)',
                                backgroundColor: 'transparent'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = 'var(--color-primary)';
                                e.target.style.backgroundColor = 'var(--color-badge-bg)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = 'var(--color-text)';
                                e.target.style.backgroundColor = 'transparent';
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>
            </div>
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
