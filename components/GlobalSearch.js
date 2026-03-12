import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Base de datos de búsqueda simulada (idealmente vendría de un archivo local o API)
const SEARCH_INDEX = [
    { title: 'Fundamentos de Redes', path: '/ciberseguridad/redes', category: 'Ciberseguridad' },
    { title: 'El Modelo OSI', path: '/ciberseguridad/redes/modelo-osi', category: 'Ciberseguridad > Redes' },
    { title: 'TCP/IP en profundidad', path: '/ciberseguridad/redes/tcp-ip', category: 'Ciberseguridad > Redes' },
    { title: 'Python Básico', path: '/programacion/python', category: 'Programación' },
    { title: 'Inyección SQL', path: '/ciberseguridad/web-security/sqli', category: 'Ciberseguridad > Web' }
];

export default function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        } else {
            setQuery('');
            setResults([]);
            setSelectedIndex(0);
        }
    }, [isOpen]);

    useEffect(() => {
        if (query.length > 1) {
            const filtered = SEARCH_INDEX.filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase()) || 
                item.category.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered.slice(0, 5));
            setSelectedIndex(0);
        } else {
            setResults([]);
        }
    }, [query]);

    useEffect(() => {
        const handleNavigation = (e) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % results.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
            } else if (e.key === 'Enter' && results.length > 0) {
                e.preventDefault();
                router.push(results[selectedIndex].path);
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleNavigation);
        return () => window.removeEventListener('keydown', handleNavigation);
    }, [isOpen, results, selectedIndex, router]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="relative w-10 h-10 lg:w-48 xl:w-64 lg:px-3 lg:py-1.5 rounded-xl lg:rounded-lg flex items-center justify-center lg:justify-start gap-2 text-sm transition-all duration-300 group shadow-md lg:shadow-none hover:scale-110 lg:hover:scale-100 border"
                style={{ 
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-muted)'
                }}
            >
                <svg className="w-5 h-5 lg:w-4 lg:h-4 text-gray-500 lg:text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden lg:block flex-1 text-left">Buscar...</span>
                <span className="hidden lg:flex items-center gap-0.5 text-xs font-semibold px-1.5 rounded" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <kbd className="font-sans">Ctrl</kbd> <kbd className="font-sans">K</kbd>
                </span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4"
                     style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}>
                    <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>
                    
                    <div className="relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col border animate-in fade-in zoom-in-95 duration-200"
                         style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                        <div className="flex items-center px-4 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                            <svg className="w-5 h-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-primary)' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                className="flex-1 py-4 px-2 bg-transparent border-none outline-none text-lg"
                                style={{ color: 'var(--color-text)' }}
                                placeholder="Buscar herramientas, conceptos, módulos..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-black/10 transition-colors">
                                <span className="text-xs px-2 py-1 border rounded font-semibold" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>ESC</span>
                            </button>
                        </div>

                        {results.length > 0 && (
                            <ul className="max-h-[60vh] overflow-y-auto p-2">
                                {results.map((item, index) => (
                                    <li key={item.path}>
                                        <Link href={item.path}
                                           onClick={() => setIsOpen(false)}
                                           className={`flex items-center justify-between p-3 rounded-xl transition-colors ${index === selectedIndex ? 'bg-black/5 dark:bg-white/5' : ''}`}
                                           style={{ 
                                               backgroundColor: index === selectedIndex ? 'var(--color-surface-hover)' : 'transparent',
                                               borderLeft: index === selectedIndex ? '3px solid var(--color-primary)' : '3px solid transparent'
                                           }}>
                                            <div className="flex flex-col">
                                                <span className="font-medium" style={{ color: index === selectedIndex ? 'var(--color-primary)' : 'var(--color-text)' }}>{item.title}</span>
                                                <span className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{item.category}</span>
                                            </div>
                                            {index === selectedIndex && (
                                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-primary)' }}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {query.length > 1 && results.length === 0 && (
                            <div className="p-8 text-center">
                                <p style={{ color: 'var(--color-text-muted)' }}>No se encontraron resultados para &quot;{query}&quot;</p>
                            </div>
                        )}
                        
                        {query.length <= 1 && (
                            <div className="p-4 text-center text-xs" style={{ color: 'var(--color-text-muted)', backgroundColor: 'var(--color-surface)' }}>
                                Escribe al menos 2 caracteres para buscar en la documentación.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
