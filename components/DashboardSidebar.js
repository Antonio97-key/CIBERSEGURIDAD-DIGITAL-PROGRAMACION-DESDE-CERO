import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/AuthContext';
import { useLanguage } from '../lib/LanguageContext';

export default function DashboardSidebar({ activeTab, setActiveTab }) {
    const { user, profile, signOut } = useAuth();
    const router = useRouter();
    const { t } = useLanguage();

    const menuItems = [
        { id: 'panel', label: t('dashboard.menu.panel'), icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { id: 'notificaciones', label: t('dashboard.menu.notificaciones'), icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
        { id: 'progreso', label: t('dashboard.menu.progreso'), icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { id: 'laboratorio', label: t('dashboard.menu.laboratorio'), icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
        { id: 'proyectos', label: t('dashboard.menu.proyectos'), icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
        { id: 'noticias', label: t('dashboard.menu.noticias'), icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
        { id: 'ciberseguridad', label: t('dashboard.menu.ciberseguridad'), icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
        { id: 'programacion', label: t('dashboard.menu.programacion'), icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { id: 'certificados', label: t('dashboard.menu.certificados'), icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
        { id: 'planes', label: t('dashboard.menu.planes'), icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        { id: 'perfil', label: t('dashboard.menu.perfil'), icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
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

                {(!progress?.subscription || progress?.subscription === 'free') && (
                    <button 
                        onClick={() => setActiveTab('planes')} 
                        className="w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:brightness-110 mb-2 shadow-lg shadow-primary-500/20" 
                        style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-button-text)' }}
                    >
                        💎 Mejorar Plan
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
