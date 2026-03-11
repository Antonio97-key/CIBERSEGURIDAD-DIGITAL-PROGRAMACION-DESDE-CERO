import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/AuthContext';
import { useLanguage } from '../lib/LanguageContext';

export default function DashboardSidebar({ activeTab, setActiveTab }) {
    const { user, profile, signOut } = useAuth();
    const router = useRouter();
    const { t } = useLanguage();

    const menuItems = [
        { id: 'panel', label: 'Centro de Comando', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { id: 'progreso', label: 'Ruta de Aprendizaje', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { id: 'laboratorio', label: 'Laboratorio CTF', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
        { id: 'certificados', label: 'Mis Certificados', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
        { id: 'perfil', label: 'Ajustes de Perfil', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    ];

    return (
        <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6">
            {/* Quick Profile Widget */}
            <div className="p-6 rounded-3xl " style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-elevation)' }}>
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black shrink-0 relative" style={{ background: 'var(--gradient-primary)', color: 'var(--color-button-text)' }}>
                        {(profile?.display_name || user?.email || 'U')[0].toUpperCase()}
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2" style={{ backgroundColor: '#10B981', borderColor: 'var(--color-surface)' }}></div>
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-extrabold truncate text-base" style={{ color: 'var(--color-text)' }}>{profile?.display_name || 'Hacker Novato'}</h3>
                        <p className="text-xs truncate font-medium" style={{ color: 'var(--color-text-muted)' }}>{user?.email}</p>
                    </div>
                </div>

                {(profile?.role === 'admin' || profile?.role === 'superadmin') && (
                    <button onClick={() => router.push('/admin')} className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:brightness-110 mb-2 shadow-sm" style={{ backgroundColor: '#ef4444', color: 'white' }}>
                        🛡️ Ir al Panel Admin
                    </button>
                )}
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${isActive ? 'shadow-md shadow-[var(--shadow-elevation)] scale-[1.02]' : 'hover:scale-[1.02]'}`}
                            style={{
                                backgroundColor: isActive ? 'var(--color-surface)' : 'transparent',
                                border: isActive ? '1px solid var(--color-border)' : '1px solid transparent',
                                color: isActive ? 'var(--color-primary)' : 'var(--color-text)'
                            }}
                        >
                            <svg className={`w-6 h-6 transition-colors ${isActive ? '' : 'opacity-60 group-hover:opacity-100 group-hover:text-[var(--color-primary)]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                            </svg>
                            <span className={`font-bold text-sm ${isActive ? '' : 'group-hover:text-[var(--color-text)]'}`}>{item.label}</span>
                        </button>
                    );
                })}

                <div className="h-px my-4 opacity-50" style={{ backgroundColor: 'var(--color-border)' }}></div>

                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 hover:bg-red-50 hover:dark:bg-red-900/10 text-red-500 hover:text-red-600 font-bold text-sm"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Cerrar Sesión</span>
                </button>
            </nav>
        </aside>
    );
}
