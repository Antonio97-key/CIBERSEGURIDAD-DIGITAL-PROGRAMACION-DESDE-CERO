import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/AuthContext';
import { useTheme, THEME_COLORS } from '../lib/ThemeContext';
import { useLanguage, LANGUAGES } from '../lib/LanguageContext';
import Link from 'next/link';
import GlobalSearch from './GlobalSearch';
import AuthModal from './AuthModal';

export default function Header() {
    const router = useRouter();
    const { user, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [moonAnimating, setMoonAnimating] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);

    const { theme, cycleTheme, themeName, themeColor, mounted } = useTheme();
    const { language, setLanguage, t } = useLanguage();

    // Close language menu on click outside
    const langMenuRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
                setLangMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        const handleOpenModal = () => setAuthModalOpen(true);
        window.addEventListener('openAuthModal', handleOpenModal);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('openAuthModal', handleOpenModal);
        };
    }, []);

    const isSpecialPage = router.pathname === '/dashboard' || router.pathname.startsWith('/admin');

    const navLinks = [
        !isSpecialPage && { name: t('header.nav.home') || 'Inicio', href: '#hero' },
        { name: 'Laboratorio', href: '/playground' },
        { name: t('header.nav.projects') || 'Proyectos', href: '/proyectos' },
        !isSpecialPage && { name: t('header.nav.cyber') || 'Ciberseguridad', href: '#cyber' },
        !isSpecialPage && { name: t('header.nav.prog') || 'Programación', href: '#prog' },
        !isSpecialPage && { name: t('header.nav.news') || 'Noticias', href: '#noticias' },
        !isSpecialPage && { name: t('header.nav.trust') || 'Confianza', href: '#confianza' },
        !isSpecialPage && { name: t('header.nav.community') || 'Comunidad', href: '#comunidad' },
        user && !isSpecialPage ? { name: 'Mi Perfil', href: '/dashboard' } : null
    ].filter(Boolean);

    const handleNavClick = (e, href) => {
        if (href.startsWith('/')) {
            setIsOpen(false);
            return;
        }
        e.preventDefault();
        setIsOpen(false);
        
        if (router.pathname !== '/' && href.startsWith('#')) {
            router.push('/' + href);
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleThemeClick = () => {
        setMoonAnimating(true);
        toggleTheme();
        setTimeout(() => setMoonAnimating(false), 400);
    };

    // Color del icono de tema, asegurando contraste en tema claro
    const displayThemeColor = themeName === 'Claro' || theme === 'light' ? '#64748b' : themeColor;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'py-2 shadow-[var(--shadow-elevation)]'
                : 'py-3'
                }`}
            style={{ backgroundColor: 'var(--color-background)', borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-3">
                
                {/* 1. TOP ROW: LOGO, ACTIONS (Desktop & Mobile) */}
                <div className="flex items-center justify-between w-full">
                    <Link href="/" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-2 md:gap-3 group shrink-0">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0">
                            {/* Premium Lock Icon */}
                            <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
                                <rect x="5" y="10" width="14" height="11" rx="3" fill="#FFD700" fillOpacity="0.9" />
                                <circle cx="12" cy="15" r="1.5" fill="white" />
                                <path d="M12 16.5V18.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm md:text-xl font-black tracking-tight gradient-text leading-tight md:leading-normal uppercase" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>CIBERSEGURIDAD<br className="sm:hidden" /> DIGITAL</span>
                            <span className="hidden sm:block text-[11px] font-bold tracking-widest uppercase mt-0.5" style={{ color: 'var(--color-primary)' }}>
                                + PROGRAMACIÓN DESDE CERO
                            </span>
                        </div>
                    </Link>

                    {/* ACTIONS CENTRALIZED (Visible Everywhere) */}
                    <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
                        <GlobalSearch />
                        
                        {/* Language Switcher */}
                        <div className="relative" ref={langMenuRef}>
                            <button
                                onClick={() => setLangMenuOpen(!langMenuOpen)}
                                className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group shadow-md"
                                style={{ backgroundColor: langMenuOpen ? 'var(--color-primary)' : 'var(--color-surface-hover)', color: langMenuOpen ? 'var(--color-button-text)' : 'var(--color-text)', border: '1px solid var(--color-border)' }}
                                aria-label={t('header.language')}
                                title={t('header.language')}
                            >
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>

                            {/* Lang Dropdown */}
                            <div className={`absolute right-0 mt-2 w-40 rounded-xl shadow-[var(--shadow-elevation)] transition-all duration-200 origin-top-right z-50 overflow-hidden ${langMenuOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'}`}
                                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                <div className="py-1">
                                    {LANGUAGES.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => { setLanguage(lang.code); setLangMenuOpen(false); }}
                                            className="w-full text-left px-4 py-2 text-sm transition-colors duration-150 flex items-center gap-3"
                                            style={{ backgroundColor: language === lang.code ? 'var(--color-surface-hover)' : 'transparent', color: language === lang.code ? 'var(--color-primary)' : 'var(--color-text)', fontWeight: language === lang.code ? 'bold' : 'normal' }}
                                        >
                                            <span style={{ color: 'var(--color-text-muted)' }} className="text-xs uppercase w-4">{lang.code.substring(0, 2)}</span>
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Theme Switcher */}
                        {mounted && (
                            <button
                                onClick={handleThemeClick}
                                className={`relative w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group shadow-md ${moonAnimating ? 'animate-moon-spin' : ''}`}
                                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                                aria-label={`${t('header.theme')} ${themeName}`}
                                title={`${t('header.theme')} ${themeName}`}
                            >
                                {theme === 'dark' ? (
                                    <svg className="w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4 md:w-5 md:h-5 transition-colors duration-300" style={{ color: displayThemeColor }} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                    </svg>
                                )}
                                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 transition-colors duration-300" style={{ backgroundColor: displayThemeColor, borderColor: 'var(--color-surface)' }} />
                            </button>
                        )}

                        {/* Auth Button */}
                        <button 
                            onClick={() => user ? router.push('/dashboard') : setAuthModalOpen(true)}
                            className="flex items-center justify-center w-9 h-9 md:w-auto md:px-5 md:h-10 rounded-xl lg:text-[10px] lg:font-black lg:uppercase lg:tracking-widest hover:brightness-110 transition-all duration-300 shadow-md active:scale-95 shrink-0"
                            style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                            aria-label={user ? 'Mi Perfil' : 'Entrar'}
                        >
                            {user && user.user_metadata?.avatar_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover rounded-xl" />
                            ) : (
                                <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 lg:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: 'var(--color-primary)' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            )}
                            <span className="hidden md:block">{user ? 'Perfil' : 'Entrar'}</span>
                        </button>
                    </div>
                </div>

                {/* 2. BOTTOM ROW: CATEGORIES (Horizontal Scroll Everywhere) */}
                <div className="flex justify-start md:justify-center w-full mt-2 overflow-x-auto hide-scrollbar pb-1">
                    <nav className="flex items-center gap-2 px-2 py-1.5 rounded-2xl shadow-sm" style={{ backgroundColor: 'var(--color-surface)' }}>
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="px-4 py-2 text-[11px] md:text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 whitespace-nowrap btn-3d"
                                style={{ 
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                                    color: 'var(--color-primary)', 
                                    boxShadow: '0 4px 0 rgba(59, 130, 246, 0.2)'
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.transform = 'translateY(4px)';
                                    e.currentTarget.style.boxShadow = '0 0 0 rgba(59, 130, 246, 0.2)';
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 0 rgba(59, 130, 246, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 0 rgba(59, 130, 246, 0.2)';
                                }}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                </div>

            </div>
            <AuthModal 
                isOpen={authModalOpen} 
                onClose={() => setAuthModalOpen(false)} 
            />
        </header>
    );
}
