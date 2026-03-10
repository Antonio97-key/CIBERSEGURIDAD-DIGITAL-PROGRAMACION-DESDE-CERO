import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/AuthContext';
import { useTheme, THEME_COLORS } from '../lib/ThemeContext';
import { useLanguage, LANGUAGES } from '../lib/LanguageContext';
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
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t('header.nav.home') || 'Inicio', href: '#hero' },
        { name: 'Laboratorio', href: '/playground' },
        { name: t('header.nav.projects') || 'Proyectos', href: '/proyectos' },
        user && { name: 'Mi Perfil', href: '/dashboard' },
        { name: t('header.nav.cyber') || 'Ciberseguridad', href: '#cyber' },
        { name: t('header.nav.prog') || 'Programación', href: '#prog' },
        { name: t('header.nav.news') || 'Noticias', href: '#noticias' },
        { name: t('header.nav.trust') || 'Confianza', href: '#confianza' },
        { name: t('header.nav.community') || 'Comunidad', href: '#comunidad' },
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
        cycleTheme();
        setTimeout(() => setMoonAnimating(false), 400);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'py-3 backdrop-blur-xl shadow-[var(--shadow-elevation)]'
                : 'py-5 bg-transparent'
                }`}
            style={scrolled ? { backgroundColor: 'var(--color-glass)' } : {}}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 group">
                        <div
                            className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div className="hidden xl:block">
                            <span className="text-sm font-bold tracking-tight gradient-text">{t('header.title')}</span>
                            <span className="block text-[10px] font-medium tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
                                {t('header.subtitle')}
                            </span>
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105"
                                style={{ color: 'var(--color-text-muted)' }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = 'var(--color-primary)';
                                    e.target.style.backgroundColor = 'var(--color-badge-bg)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = 'var(--color-text-muted)';
                                    e.target.style.backgroundColor = 'transparent';
                                }}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <GlobalSearch />
                        
                        {/* Auth Button */}
                        <button 
                            onClick={() => user ? signOut() : setAuthModalOpen(true)}
                            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary-500 transition-all duration-300 shadow-xl hover:shadow-primary-500/20 active:scale-95"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {user ? 'Salir' : 'Entrar'}
                        </button>

                        {/* Language Switcher */}
                        <div className="relative" ref={langMenuRef}>
                            <button
                                onClick={() => setLangMenuOpen(!langMenuOpen)}
                                className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                                style={{
                                    backgroundColor: langMenuOpen ? 'var(--color-primary)' : 'var(--color-surface-hover)',
                                    color: langMenuOpen ? 'var(--color-button-text)' : 'inherit',
                                    border: '1px solid var(--color-border)',
                                }}
                                aria-label={t('header.language')}
                                title={t('header.language')}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setLangMenuOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm transition-colors duration-150 flex items-center gap-3"
                                            style={{
                                                backgroundColor: language === lang.code ? 'var(--color-surface-hover)' : 'transparent',
                                                color: language === lang.code ? 'var(--color-primary)' : 'var(--color-text)',
                                                fontWeight: language === lang.code ? 'bold' : 'normal'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (language !== lang.code) e.target.style.backgroundColor = 'var(--color-surface-hover)';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (language !== lang.code) e.target.style.backgroundColor = 'transparent';
                                            }}
                                        >
                                            <span style={{ color: 'var(--color-text-muted)' }} className="text-xs uppercase w-4">{lang.code.substring(0, 2)}</span>
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Moon Icon - Theme Cycler */}
                        {mounted && (
                            <button
                                onClick={handleThemeClick}
                                className={`relative w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group ${moonAnimating ? 'animate-moon-spin' : ''}`}
                                style={{
                                    backgroundColor: 'var(--color-surface-hover)',
                                    border: '1px solid var(--color-border)',
                                }}
                                aria-label={`${t('header.theme')} ${themeName}`}
                                title={`${t('header.theme')} ${themeName}`}
                            >
                                <svg
                                    className="w-5 h-5 transition-colors duration-300"
                                    style={{ color: themeColor }}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                                {/* Theme color indicator dot */}
                                <span
                                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 transition-colors duration-300"
                                    style={{
                                        backgroundColor: themeColor,
                                        borderColor: 'var(--color-surface)',
                                    }}
                                />
                            </button>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300"
                            style={{ backgroundColor: 'var(--color-surface-hover)' }}
                            aria-label="Menú"
                        >
                            <div className="w-5 h-5 relative flex flex-col justify-center items-center">
                                <span
                                    className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 absolute' : '-translate-y-1.5'}`}
                                    style={{ backgroundColor: 'var(--color-text)' }}
                                />
                                <span
                                    className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}
                                    style={{ backgroundColor: 'var(--color-text)' }}
                                />
                                <span
                                    className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 absolute' : 'translate-y-1.5'}`}
                                    style={{ backgroundColor: 'var(--color-text)' }}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <nav
                    className="px-4 py-4 mt-2 mx-4 rounded-2xl backdrop-blur-xl shadow-lg"
                    style={{
                        backgroundColor: 'var(--color-glass)',
                        border: '1px solid var(--color-border)',
                    }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="block px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200"
                            style={{ color: 'var(--color-text)' }}
                        >
                            {link.name}
                        </a>
                    ))}
                    {/* Theme indicator in mobile menu */}
                    <div
                        className="flex items-center gap-2 px-4 py-3 mt-2 rounded-xl text-xs font-medium"
                        style={{
                            backgroundColor: 'var(--color-badge-bg)',
                            color: 'var(--color-primary)',
                            border: '1px solid var(--color-border)',
                        }}
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                        {t('header.theme')} {themeName}
                    </div>
                </nav>
            </div>
            <AuthModal 
                isOpen={authModalOpen} 
                onClose={() => setAuthModalOpen(false)} 
            />
        </header>
    );
}
