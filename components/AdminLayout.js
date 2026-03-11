import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/AuthContext';
import Link from 'next/link';

export default function AdminLayout({ children, title }) {
    const { user, profile, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/');
            } else if (profile?.role !== 'admin' && profile?.role !== 'superadmin') {
                router.push('/dashboard');
            }
        }
    }, [user, profile, loading]);

    if (loading || !user || (profile?.role !== 'admin' && profile?.role !== 'superadmin')) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
                <div className="animate-pulse flex flex-col items-center">
                    <span className="text-4xl mb-4">🛡️</span>
                    <p className="text-red-500 font-bold uppercase tracking-widest text-sm">Verificando Credenciales de Administrador...</p>
                </div>
            </div>
        );
    }

    const navLinks = [
        { href: '/admin', label: 'Dashboard', icon: '📊' },
        { href: '/admin/usuarios', label: 'Usuarios', icon: '👥' },
        { href: '/admin/contenido', label: 'Contenido', icon: '📚' },
        { href: '/admin/foro', label: 'Foro Moderación', icon: '💬' },
        { href: '/admin/configuracion', label: 'Configuración', icon: '⚙️' },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#0f0f0f] border-r border-[#222] p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-500 flex items-center justify-center text-xl">
                        🛡️
                    </div>
                    <div>
                        <h1 className="font-black text-lg tracking-tight">Admin<span className="text-red-500">Panel</span></h1>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{profile.role}</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {navLinks.map((link) => {
                        const isActive = router.pathname === link.href;
                        return (
                            <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${isActive ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'}`}>
                                <span className="text-lg">{link.icon}</span>
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-[#222]">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all">
                        <span className="text-lg">⬅️</span>
                        Volver a Lado Público
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 p-8 md:p-12">
                {title && <h2 className="text-3xl font-black mb-8">{title}</h2>}
                <div className="animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
}
