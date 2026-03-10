import { useAuth } from '../lib/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const { user, loading, progress } = useAuth();
    const router = useRouter();

    useEffect(() => {
// ...
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading]);

    if (loading || !user) return <div className="min-h-screen bg-black flex items-center justify-center text-primary-500 font-black uppercase tracking-[0.3em]">Cargando Terminal...</div>;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary-500/30">
            <Head>
                <title>Comando Central | {user.email}</title>
            </Head>
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Profile Header */}
                <header className="flex flex-col md:flex-row items-center gap-10 mb-20 bg-graphite-900/50 border border-white/5 p-12 rounded-[50px] backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <svg className="w-64 h-64 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                    </div>

                    <div className="relative group">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 p-1 transition-transform duration-500 group-hover:rotate-12">
                            <div className="w-full h-full rounded-full bg-graphite-900 flex items-center justify-center overflow-hidden border-4 border-black">
                                <span className="text-4xl md:text-5xl font-black text-white">{user.email[0].toUpperCase()}</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-primary-500 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-4 border-black">
                            LVL {progress.level}
                        </div>
                    </div>

                    <div className="flex-grow text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">{user.email}</h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <div className="px-5 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Estado: Activo</span>
                            </div>
                            <div className="px-5 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary-500">{progress.xp} XP acumulados</span>
                            </div>
                            <div className="px-5 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-orange-500">
                                <span className="text-[10px] font-black uppercase tracking-widest">🔥 {progress.streak} días racha</span>
                            </div>
                        </div>
                    </div>
                    
                    <button className="px-8 py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-all shadow-xl active:scale-95">
                        Editar Perfil
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    <StatCard title="Lecciones Vistas" value={progress.lessons?.length || 0} total={60} color="primary" />
                    <StatCard title="Proyectos Labs" value={progress.projects?.length || 0} total={20} color="purple" />
                    <StatCard title="Módulos Dominados" value={Math.floor((progress.xp || 0) / 500)} total={10} color="green" />
                    <StatCard title="Challenges CTF" value={Math.floor((progress.xp || 0) / 100)} total={50} color="red" />
                </div>

                {/* Badges & Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <section className="lg:col-span-2">
                        <h3 className="text-2xl font-black mb-8 flex items-center gap-3 italic">
                            Badges de Honor
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            {progress.badges.map(badge => (
                                <div key={badge} className="aspect-square rounded-[40px] bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-4 group hover:bg-white/10 transition-all cursor-default">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-purple-600/20 flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{badge}</span>
                                </div>
                            ))}
                            <div className="aspect-square rounded-[40px] border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 opacity-50">
                                <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center text-gray-600 text-2xl">+</div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Bloqueado</span>
                            </div>
                        </div>
                    </section>

                    <section className="bg-graphite-900 border border-white/5 rounded-[40px] p-10">
                        <h3 className="text-xl font-black mb-8">Actividad Reciente</h3>
                        <div className="space-y-8">
                            <ActivityItem icon="📖" text="Completaste 'Modelo OSI'" time="hace 2 horas" />
                            <ActivityItem icon="💻" text="Iniciaste 'ARP Spoofer'" time="hace 5 horas" />
                            <ActivityItem icon="🎯" text="Nuevo Badge: Cripto-Analista" time="hace 1 día" />
                            <ActivityItem icon="🚪" text="Acceso autorizado desde CDMX" time="hace 2 días" />
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function StatCard({ title, value, total, color }) {
    const percentage = (value / total) * 100;
    const colorClasses = {
        primary: 'bg-primary-500',
        purple: 'bg-purple-500',
        green: 'bg-green-500',
        red: 'bg-red-500'
    };

    return (
        <div className="p-8 bg-graphite-900 border border-white/5 rounded-[40px] hover:border-white/10 transition-all">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">{title}</h4>
            <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black">{value}</span>
                <span className="text-gray-600 text-sm">/ {total}</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                    className={`h-full ${colorClasses[color]} transition-all duration-1000`} 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
}

function ActivityItem({ icon, text, time }) {
    return (
        <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg">{icon}</div>
            <div>
                <p className="text-sm font-bold text-gray-300">{text}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mt-1">{time}</p>
            </div>
        </div>
    );
}
