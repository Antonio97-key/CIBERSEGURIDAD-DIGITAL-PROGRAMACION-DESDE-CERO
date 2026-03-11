import { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';

const testimonials = [
    {
        name: 'José Ramón',
        role: 'Estudiante de Redes',
        date: '12 febrero 2026',
        text: 'Excelente plataforma. Me ayudó mucho a entender los fundamentos de la ciberseguridad.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        name: 'Ana García',
        role: 'Profesora de Matemáticas',
        date: '27 enero 2026',
        text: 'Muy clara y fácil de seguir. La recomiendo para cualquier persona que quiera iniciarse en seguridad informática.',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
        name: 'Carlos M.',
        role: 'Comerciante Independiente',
        date: '18 diciembre 2025',
        text: 'Ahora sé cómo asegurar mejor la web de mi negocio de los ataques comunes. Me sirvió enormemente.',
        avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
    },
    {
        name: 'Maya P.',
        role: 'Desarrolladora Web',
        date: '9 febrero 2026',
        text: 'Los laboratorios prácticos son lo mejor de la plataforma, muy dinámicos.',
        avatar: 'MP',
    },
    {
        name: 'Javier R.',
        role: 'Bachiller Graduado',
        date: '21 enero 2026',
        text: 'Acabo de salir del colegio y este sitio me dio una base sólida en hacking ético antes de ir a la U.',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    {
        name: 'David L.',
        role: 'Soporte Técnico',
        date: '2 marzo 2026',
        text: 'Una herramienta imprescindible para cualquier persona en soporte que quiera aprender sobre redes y puertos.',
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    },
    {
        name: 'Sofía T.',
        role: 'Estudiante de Secundaria',
        date: '15 noviembre 2025',
        text: 'Me encantó la comparativa entre Python y JavaScript. Fue súper fácil de entender paso a paso.',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
        name: 'Luis Fernando',
        role: 'Desarrollador Junior',
        date: '5 marzo 2026',
        text: 'La interfaz gráfica es fluida. Los retos tipo CTF en verdad te motivan a seguir investigando.',
        avatar: 'LF',
    },
    {
        name: 'Valentina C.',
        role: 'Emprendedora',
        date: '11 febrero 2026',
        text: 'Aprendí a no caer en ataques de phishing básicos. Fundamental para mi vida diaria.',
        avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    },
    {
        name: 'Andrés G.',
        role: 'Ingeniero de Sistemas',
        date: '25 febrero 2026',
        text: 'Increíble calidad en el currículo de TCP/IP y protocolos. Aporta mucho valor incluso para profesionales.',
        avatar: 'AG',
    }
];

export default function TestimonialsSlider() {
    const { t } = useLanguage();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative py-20">
            <div className="section-container">
                <div className="text-center mb-16">
                    <span className="chip chip-primary mb-4 inline-flex">⭐ {t('testimonials.badge')}</span>
                    <h2 className="section-title gradient-text">{t('testimonials.title')}</h2>
                    <p className="section-subtitle mx-auto">
                        {t('testimonials.subtitle')}
                    </p>
                </div>

                {/* Slider */}
                <div className="max-w-2xl mx-auto">
                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            {testimonials.map((t, idx) => (
                                <div key={idx} className="w-full flex-shrink-0 px-4">
                                    <div className="glass-card p-8 text-center">
                                        {/* Avatar */}
                                        {t.avatar.startsWith('http') ? (
                                            <div className="w-16 h-16 rounded-full mx-auto mb-5 overflow-hidden ring-4 ring-primary-500/20 shadow-lg">
                                                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center text-xl font-bold text-white gradient-bg shadow-lg ring-4 ring-primary-500/20">
                                                {t.avatar}
                                            </div>
                                        )}

                                        {/* Quote */}
                                        <svg className="w-8 h-8 mx-auto mb-4 opacity-20" style={{ color: 'var(--color-primary)' }} fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                        </svg>

                                        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
                                            &ldquo;{t.text}&rdquo;
                                        </p>

                                        <h4 className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{t.name}</h4>
                                        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{t.role} • <span className="text-primary-500 italic">{t.date}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                                style={{
                                    backgroundColor: current === idx ? 'var(--color-primary)' : 'var(--color-border)',
                                    transform: current === idx ? 'scale(1.3)' : 'scale(1)',
                                }}
                                aria-label={`Testimonio ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
