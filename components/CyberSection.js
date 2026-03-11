import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import QuizForm from './QuizForm';

const colorMap = {
    blue: { chip: 'chip-blue', border: 'border-primary-200 dark:border-primary-800/30', bg: 'bg-primary-50 dark:bg-primary-900/10' },
    green: { chip: 'chip-green', border: 'border-green-200 dark:border-green-800/30', bg: 'bg-green-50 dark:bg-green-900/10' },
    purple: { chip: 'chip-purple', border: 'border-purple-200 dark:border-purple-800/30', bg: 'bg-purple-50 dark:bg-purple-900/10' },
    orange: { chip: 'chip-orange', border: 'border-orange-200 dark:border-orange-800/30', bg: 'bg-orange-50 dark:bg-orange-900/10' },
    cyan: { chip: 'chip-blue', border: 'border-cyan-200 dark:border-cyan-800/30', bg: 'bg-cyan-50 dark:bg-cyan-900/10' },
};

export default function CyberSection({ level }) {
    const { t } = useLanguage();
    const [currentLevel, setCurrentLevel] = useState(1);
    const [completedLevels, setCompletedLevels] = useState([]);
    const [activeLevel, setActiveLevel] = useState(1);
    const [quizState, setQuizState] = useState(null); // null, 'correct', 'incorrect'

    const levels = [
        {
            id: 1,
            module: 'redes',
            title: t('cyber_levels.l1.title') || 'Fundamentos de Redes',
            description: t('cyber_levels.l1.desc') || 'Aprende cómo viajan los datos por Internet y dónde están las vulnerabilidades más comunes.',
            icon: '🌐',
            color: 'blue',
            content: [t('cyber_levels.l1.t1') || 'Modelo OSI', t('cyber_levels.l1.t2') || 'TCP/IP', t('cyber_levels.l1.t3') || 'Puertos comunes', t('cyber_levels.l1.t4') || 'DNS y Spoofing'],
            quiz: {
                question: t('cyber_levels.l1.q') || '¿Qué puerto es comúnmente usado para tráfico web no encriptado (HTTP)?',
                options: [
                    { value: 'incorrecta1', label: 'Puerto 21' },
                    { value: 'correcta', label: 'Puerto 80' },
                    { value: 'incorrecta2', label: 'Puerto 443' },
                ],
            }
        },
        {
            id: 2,
            module: 'criptografia',
            title: t('cyber_levels.l2.title') || 'Criptografía Básica',
            description: t('cyber_levels.l2.desc') || 'Entiende cómo se protege la información mediante cifrado y algoritmos de hashing.',
            icon: '🔐',
            color: 'green',
            content: [t('cyber_levels.l2.t1') || 'Cifrado Simétrico vs Asimétrico', t('cyber_levels.l2.t2') || 'Hashes (MD5, SHA-256)', t('cyber_levels.l2.t3') || 'Certificados SSL/TLS', t('cyber_levels.l2.t4') || 'Gestión de claves'],
            quiz: {
                question: t('cyber_levels.l2.q') || '¿Cuál de los siguientes NO es un algoritmo de hashing seguro hoy en día?',
                options: [
                    { value: 'correcta', label: 'MD5' },
                    { value: 'incorrecta1', label: 'SHA-256' },
                    { value: 'incorrecta2', label: 'Argon2' },
                ],
            }
        },
        {
            id: 3,
            module: 'malware',
            title: t('cyber_levels.l3.title') || 'Malware y Amenazas',
            description: t('cyber_levels.l3.desc') || 'Conoce los diferentes tipos de software malicioso y cómo infectan los sistemas.',
            icon: '🦠',
            color: 'purple',
            content: [t('cyber_levels.l3.t1') || 'Virus vs Gusanos', t('cyber_levels.l3.t2') || 'Ransomware', t('cyber_levels.l3.t3') || 'Troyanos', t('cyber_levels.l3.t4') || 'Spyware & Adware'],
            quiz: {
                question: t('cyber_levels.l3.q') || '¿Qué tipo de malware "secuestra" tus archivos y pide un pago para liberarlos?',
                options: [
                    { value: 'incorrecta1', label: 'Spyware' },
                    { value: 'correcta', label: 'Ransomware' },
                    { value: 'incorrecta2', label: 'Adware' },
                ],
            }
        },
        {
            id: 4,
            module: 'ingenieria-social',
            title: t('cyber_levels.l4.title') || 'Ingeniería Social',
            description: t('cyber_levels.l4.desc') || 'Aprende cómo los atacantes manipulan a las personas para eludir los controles tecnológicos.',
            icon: '🎣',
            color: 'orange',
            content: [t('cyber_levels.l4.t1') || 'Phishing', t('cyber_levels.l4.t2') || 'Baiting', t('cyber_levels.l4.t3') || 'Tailgating', t('cyber_levels.l4.t4') || 'Pretexting'],
            quiz: {
                question: t('cyber_levels.l4.q') || 'Recibes un correo urgente de tu "banco" pidiendo que inicies sesión en un enlace. Esto es un ejemplo de:',
                options: [
                    { value: 'incorrecta1', label: 'DDoS' },
                    { value: 'correcta', label: 'Phishing' },
                    { value: 'incorrecta2', label: 'Spoofing' },
                ],
            }
        },
        {
            id: 5,
            module: 'web-security',
            title: t('cyber_levels.l5.title') || 'Seguridad en Aplicaciones Web',
            description: t('cyber_levels.l5.desc') || 'Explora las vulnerabilidades más comunes en el desarrollo web moderno.',
            icon: '💻',
            color: 'cyan',
            content: [t('cyber_levels.l5.t1') || 'Inyección SQL', t('cyber_levels.l5.t2') || 'Cross-Site Scripting (XSS)', t('cyber_levels.l5.t3') || 'CSRF', t('cyber_levels.l5.t4') || 'Autenticación rota'],
            quiz: {
                question: t('cyber_levels.l5.q') || '¿Qué ataque consiste en inyectar scripts maliciosos en páginas web vistas por otros usuarios?',
                options: [
                    { value: 'incorrecta1', label: 'SQLi' },
                    { value: 'correcta', label: 'XSS' },
                    { value: 'incorrecta2', label: 'CSRF' },
                ],
            }
        }
    ];

    const completeLevel = (levelId) => {
        if (!completedLevels.includes(levelId)) {
            setCompletedLevels([...completedLevels, levelId]);
        }
        setCurrentLevel(Math.min(levelId + 1, levels.length));
    };

    return (
        <section id="cyber" className="relative py-20 section-alt" >
            <div className="section-container">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="chip chip-blue mb-4 inline-flex">🛡️ {t('cyber.badge')}</span>
                    <h2 className="section-title gradient-text">{t('cyber.title')}</h2>
                    <p className="section-subtitle mx-auto">
                        {t('cyber.subtitle')}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Tu progreso</span>
                        <span className="text-sm font-bold gradient-text">
                            {completedLevels.length} / {levels.length} niveles
                        </span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-graphite-700 overflow-hidden">
                        <div
                            className="h-full rounded-full gradient-bg transition-all duration-700 ease-out"
                            style={{ width: `${(completedLevels.length / levels.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Level Cards */}
                <div className="space-y-6">
                    {levels.map((lvl) => {
                        const isAccessible = level === 'advanced' || lvl.id <= currentLevel;
                        const isCompleted = completedLevels.includes(lvl.id);
                        const colors = colorMap[lvl.color];

                        return (
                            <div
                                key={lvl.id}
                                className={`glass-card p-6 sm:p-8 transition-all duration-500 ${!isAccessible ? 'opacity-40 pointer-events-none blur-[2px]' : ''
                                    } ${isCompleted ? 'ring-2 ring-green-400/50' : ''}`}
                            >
                                <div className="flex flex-col md:flex-row items-start gap-4">
                                    {/* Level Icon */}
                                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${colors.bg} ${colors.border} border-2 flex items-center justify-center text-2xl mb-4 md:mb-0`}>
                                        {isCompleted ? '✅' : lvl.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 w-full">
                                        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                                                    {lvl.title}
                                                </h3>
                                                {isCompleted && (
                                                    <span className="chip chip-green text-[10px]">Completado</span>
                                                )}
                                            </div>
                                            
                                            {isAccessible && (
                                                <Link href={`/ciberseguridad/${lvl.module}`} 
                                                      className="btn-3d btn-3d-primary text-xs py-2 px-4 whitespace-nowrap">
                                                    Explorar Módulo 🚀
                                                </Link>
                                            )}
                                        </div>

                                        <p className="text-base font-semibold text-gray-600 dark:text-gray-300 mb-5 italic">
                                            {lvl.description}
                                        </p>

                                        <ul className="space-y-2 mb-6">
                                            {lvl.content.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-base font-medium text-gray-700 dark:text-gray-200">
                                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                                                    </svg>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Quiz */}
                                        {lvl.quiz && !isCompleted && isAccessible && (
                                            <QuizForm
                                                question={lvl.quiz.question}
                                                options={lvl.quiz.options}
                                                onComplete={() => completeLevel(lvl.id)}
                                            />
                                        )}

                                        {/* No quiz for last level - completion button */}
                                        {!lvl.quiz && !isCompleted && isAccessible && (
                                            <button
                                                onClick={() => completeLevel(lvl.id)}
                                                className="btn-3d btn-3d-secondary text-sm"
                                            >
                                                Marcar como completado
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section >
    );
}
