import { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';

const resources = [
    {
        category: 'Herramientas de Élite',
        icon: '🛠️',
        items: [
            { name: 'Visual Studio Code', desc: 'Editor de código profesional y extensible', url: 'https://code.visualstudio.com/', tag: 'Editor' },
            { name: 'Python.org', desc: 'Instalación de Python de grado industrial', url: 'https://python.org/', tag: 'Lenguaje' },
            { name: 'Node.js', desc: 'Entorno de ejecución JavaScript escalable', url: 'https://nodejs.org/', tag: 'Runtime' },
            { name: 'Git', desc: 'Control de versiones para tu código', url: 'https://git-scm.com/', tag: 'Herramienta' },
        ],
    },
    {
        category: 'Academias Profesionales',
        icon: '📚',
        items: [
            { name: 'freeCodeCamp', desc: 'Currículo interactivo de código abierto', url: 'https://freecodecamp.org/', tag: 'Curso' },
            { name: 'TryHackMe', desc: 'Laboratorios prácticos de ciberseguridad', url: 'https://tryhackme.com/', tag: 'Seguridad' },
            { name: 'HackerRank', desc: 'Retos de programación por niveles', url: 'https://hackerrank.com/', tag: 'Práctica' },
            { name: 'Codecademy', desc: 'Aprende programación interactivamente', url: 'https://codecademy.com/', tag: 'Curso' },
        ],
    },
    {
        category: 'Documentación',
        icon: '📖',
        items: [
            { name: 'MDN Web Docs', desc: 'Referencia completa de JavaScript y web', url: 'https://developer.mozilla.org/', tag: 'Referencia' },
            { name: 'Python Docs', desc: 'Documentación oficial de Python', url: 'https://docs.python.org/', tag: 'Referencia' },
            { name: 'OWASP', desc: 'Guías de seguridad web (Top 10)', url: 'https://owasp.org/', tag: 'Seguridad' },
        ],
    },
];

const glossary = [
    { term: 'API', def: 'Interfaz de Programación de Aplicaciones. Permite que software se comunique con otro software.' },
    { term: 'Backend', def: 'Parte del software que se ejecuta en el servidor, invisible para el usuario.' },
    { term: 'Bug', def: 'Error en el código que produce un comportamiento inesperado.' },
    { term: 'Cifrado', def: 'Proceso de convertir datos legibles en un formato codificado para protegerlos.' },
    { term: 'DNS', def: 'Sistema de Nombres de Dominio. Traduce nombres de sitios web a direcciones IP.' },
    { term: 'Firewall', def: 'Sistema de seguridad que filtra el tráfico de red no autorizado.' },
    { term: 'HTTPS', def: 'Protocolo seguro para transferencia de datos web, usando cifrado SSL/TLS.' },
    { term: 'Malware', def: 'Software malicioso diseñado para dañar o infiltrar sistemas.' },
    { term: 'Phishing', def: 'Técnica de ingeniería social para obtener datos personales mediante engaño.' },
    { term: 'SQL Injection', def: 'Ataque que inserta código SQL malicioso para manipular bases de datos.' },
    { term: 'XSS', def: 'Cross-Site Scripting. Inyección de scripts maliciosos en sitios web.' },
    { term: 'Token', def: 'Cadena de caracteres que representa una autorización o identidad.' },
];

export default function Resources() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('recursos');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredGlossary = glossary.filter(
        (g) =>
            g.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            g.def.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section id="recursos" className="relative py-20">
            <div className="section-container">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="chip chip-blue mb-4 inline-flex">📦 {t('resources.badge')}</span>
                    <h2 className="section-title gradient-text">{t('resources.title')}</h2>
                    <p className="section-subtitle mx-auto">
                        {t('resources.subtitle')}
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex bg-gray-100 dark:bg-graphite-700 rounded-2xl p-1.5">
                        {[
                            { id: 'recursos', label: '🛠️ Recursos' },
                            { id: 'glosario', label: '📖 Glosario' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-white dark:bg-graphite-600 shadow-md text-primary-600 dark:text-primary-400'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Resources */}
                {activeTab === 'recursos' && (
                    <div className="space-y-10 animate-fade-in">
                        {resources.map((category) => (
                            <div key={category.category}>
                                <h3 className="text-3xl font-black mb-8 flex items-center gap-4" style={{ color: 'var(--color-text)' }}>
                                    <span className="text-4xl">{category.icon}</span>
                                    {category.category}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {category.items.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="glass-card p-5 group block"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <h4 className="font-extrabold text-xl transition-colors leading-tight" style={{ color: 'var(--color-primary)' }}>
                                                    {item.name}
                                                </h4>
                                                <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </div>
                                            <p className="text-base font-semibold mb-6 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                                            <span className="chip chip-blue text-xs font-bold">{item.tag}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Glossary */}
                {activeTab === 'glosario' && (
                    <div className="animate-fade-in">
                        {/* Search */}
                        <div className="max-w-md mx-auto mb-8 relative">
                            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Buscar término..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-modern pl-12"
                            />
                        </div>

                        {/* Glossary Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredGlossary.map((item) => (
                                <div key={item.term} className="glass-card p-6">
                                    <h4 className="font-black text-xl mb-4" style={{ color: 'var(--color-primary)' }}>
                                        {item.term}
                                    </h4>
                                    <p className="text-base font-semibold leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                        {item.def}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {filteredGlossary.length === 0 && (
                            <p className="text-center text-gray-400 py-8">
                                No se encontraron términos para &ldquo;{searchTerm}&rdquo;
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
