import { useLanguage } from '../lib/LanguageContext';

export default function HeroSection() {
    const { t } = useLanguage();

    return (
        <section id="hero" className="relative min-h-[95vh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden pt-[240px] xs:pt-[240px] sm:pt-[260px] pb-12 sm:pb-20">
            {/* Decorative Theme-Aware Orbs - Pointer events none to prevent layout issues */}
            <div className="glow-orb w-64 h-64 sm:w-96 sm:h-96 top-5 -left-10 sm:top-10 sm:-left-20 absolute animate-float pointer-events-none" style={{ backgroundColor: 'var(--color-primary)', opacity: 0.4 }} />
            <div className="glow-orb w-56 h-56 sm:w-80 sm:h-80 bottom-5 -right-10 sm:bottom-10 sm:-right-20 absolute animate-float pointer-events-none" style={{ backgroundColor: 'var(--color-secondary)', opacity: 0.3, animationDelay: '3s' }} />
            <div className="glow-orb w-48 h-48 sm:w-64 sm:h-64 top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 animate-pulse-slow pointer-events-none" style={{ backgroundColor: 'var(--color-primary)', opacity: 0.2 }} />

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-6 max-w-7xl mx-auto w-full flex flex-col items-center">
                {/* Scrolling Notice - Standardized width and centered */}
                <div className="mb-6 sm:mb-12 news-marquee-container w-full max-w-full overflow-hidden py-3 cursor-default select-none pointer-events-none bg-surface-hover/30 backdrop-blur-sm rounded-xl">
                    <div className="news-track flex gap-8 sm:gap-16 animate-marquee whitespace-nowrap">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-8 sm:gap-16 shrink-0">
                                <span className="flex items-center gap-2 text-[11px] sm:text-xs md:text-sm font-black tracking-[0.2em] uppercase" style={{ color: 'var(--color-primary)' }}>
                                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                                    {t('hero.notice')}
                                </span>
                                <span className="flex items-center gap-2 text-[11px] sm:text-xs md:text-sm font-black tracking-[0.2em] uppercase" style={{ color: 'var(--color-secondary)' }}>
                                    <span className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
                                    {t('hero.notice')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 sm:mb-8 tracking-tight animate-slide-up leading-tight sm:leading-[1.1]" style={{ color: 'var(--color-text)' }}>
                    {t('hero.title_1')}
                    <br />
                    <span 
                        className="text-transparent bg-clip-text" 
                        style={{ backgroundImage: 'var(--gradient-primary)' }}
                    >
                        {t('hero.title_2')}
                    </span>
                    <br />
                    <span className="text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-light opacity-80" style={{ color: 'var(--color-text)' }}>
                        {t('hero.title_3')}
                    </span>
                </h1>
 
                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl font-medium mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s', color: 'var(--color-text)' }}>
                    {t('hero.subtitle')}
                    <span className="block mt-2 text-sm sm:text-base font-semibold" style={{ color: 'var(--color-text)' }}>
                        {t('hero.subtitle_sub')}
                    </span>
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <a
                        href="#cyber"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#cyber')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="btn-3d btn-3d-primary w-full sm:w-auto px-8 py-4 text-center"
                    >
                        <svg className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        {t('hero.cta_start')}
                    </a>
                    <a
                        href="#prog"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#prog')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="btn-3d w-full sm:w-auto px-8 py-4 border-[2px] text-center shadow-lg transition-colors hover:scale-105"
                        style={{ backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
                    >
                        <svg className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        {t('hero.cta_explore')}
                    </a>
                </div>

                <div className="mt-16 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}>
                    {[
                        { value: '5+', label: t('hero.stats.idioms') || 'Idiomas' },
                        { value: '💎', label: t('hero.stats.certification') || 'Certificación VIP' },
                        { value: '60+', label: t('hero.stats.lessons') || 'Lecciones' },
                        { value: '24/7', label: t('hero.stats.community') || 'Comunidad' },
                    ].map(({ value, label }) => (
                        <div key={label} className="text-center">
                            <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--color-text)' }}>{value}</div>
                            <div className="text-[10px] sm:text-xs mt-2 uppercase tracking-widest font-black" style={{ color: 'var(--color-text-muted)' }}>{label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 opacity-50" style={{ color: 'var(--color-text)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
