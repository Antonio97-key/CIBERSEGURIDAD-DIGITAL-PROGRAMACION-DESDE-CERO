import { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';

const testimonials = [
    {
        name: 'Carlos Méndez',
        role: 'Estudiante de Ingeniería',
        text: 'Esta plataforma me ayudó a entender la ciberseguridad de forma práctica. Los quizzes y proyectos hacen que todo sea más fácil de aprender.',
        avatar: 'CM',
    },
    {
        name: 'María Paulino',
        role: 'Emprendedora Digital',
        text: 'Gracias a los proyectos de integración pude implementar seguridad básica en mi negocio online. ¡Excelente recurso gratuito!',
        avatar: 'MP',
    },
    {
        name: 'José Rodríguez',
        role: 'Desarrollador Junior',
        text: 'El editor interactivo y la tabla comparativa Python vs JavaScript son geniales para practicar sin instalar nada.',
        avatar: 'JR',
    },
    {
        name: 'Ana García',
        role: 'Profesora de Informática',
        text: 'Uso esta plataforma como material complementario en mis clases. El contenido está bien estructurado y actualizado.',
        avatar: 'AG',
    },
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
                                        <div
                                            className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center text-xl font-bold text-white gradient-bg"
                                        >
                                            {t.avatar}
                                        </div>

                                        {/* Quote */}
                                        <svg className="w-8 h-8 mx-auto mb-4 opacity-20" style={{ color: 'var(--color-primary)' }} fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                        </svg>

                                        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
                                            &ldquo;{t.text}&rdquo;
                                        </p>

                                        <h4 className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{t.name}</h4>
                                        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{t.role}</p>
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
