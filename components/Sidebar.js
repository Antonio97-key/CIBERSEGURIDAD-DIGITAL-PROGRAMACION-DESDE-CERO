import { useLanguage } from '../lib/LanguageContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { curriculum } from '../data/curriculum';

export default function Sidebar() {
    const { t } = useLanguage();
    const router = useRouter();
    const { asPath } = router;

    const sections = [
        {
            title: 'Ciberseguridad',
            icon: '🛡️',
            basePath: '/ciberseguridad',
            items: Object.entries(curriculum.ciberseguridad).map(([key, value]) => ({
                id: key,
                label: value.title,
                path: `/ciberseguridad/${key}`
            }))
        },
        {
            title: 'Programación',
            icon: '💻',
            basePath: '/programacion',
            items: Object.entries(curriculum.programacion).map(([key, value]) => ({
                id: key,
                label: value.title,
                path: `/programacion/${key}`
            }))
        },
        {
            title: 'Práctica',
            icon: '🚀',
            basePath: '/practica',
            items: [
                { id: 'proyectos', label: 'Proyectos Reales', path: '/proyectos' },
                { id: 'ejercicios', label: 'Laboratorios CTF', path: '/ejercicios' }
            ]
        }
    ];

    return (
        <aside className="hidden lg:block w-72 flex-shrink-0 h-[calc(100vh-80px)] overflow-y-auto sticky top-[80px] border-r"
            style={{ 
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)'
            }}>
            <nav className="p-6 space-y-8">
                {sections.map((section, idx) => (
                    <div key={idx}>
                        <h3 className="text-xs font-bold uppercase tracking-wider mb-4 px-2" style={{ color: 'var(--color-text-muted)' }}>
                            <span className="mr-2">{section.icon}</span>
                            {section.title}
                        </h3>
                        <ul className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = asPath.startsWith(item.path);
                                return (
                                    <li key={item.id}>
                                        <Link href={item.path}
                                            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${isActive ? 'bg-black/5 dark:bg-white/5' : ''}`}
                                            style={{
                                                color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                                backgroundColor: isActive ? 'var(--color-badge-bg)' : 'transparent'
                                            }}>
                                            <div className={`w-1 h-4 rounded-full mr-2 transition-all ${isActive ? 'bg-blue-500 scale-y-100' : 'bg-transparent scale-y-0'}`}
                                                style={{ backgroundColor: 'var(--color-primary)' }}></div>
                                            <span className="flex-1">{item.label}</span>
                                            {isActive && (
                                                <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
}
