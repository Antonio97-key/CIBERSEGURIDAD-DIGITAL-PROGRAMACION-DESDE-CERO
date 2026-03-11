import { useAuth } from '../lib/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import DashboardSidebar from '../components/DashboardSidebar';
import { getNextLevelTarget, LEVEL_THRESHOLDS } from '../lib/gamification';

export default function Dashboard() {
    const { user, loading, progress, updateProgress, profile, updateProfile, signOut } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('panel');
    const [editMode, setEditMode] = useState(false);
    const [editForm, setEditForm] = useState({ display_name: '', bio: '' });
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading]);

    useEffect(() => {
        if (profile) {
            setEditForm({ display_name: profile.display_name, bio: profile.bio });
        }
    }, [profile]);

    if (loading || !user) return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
            <div className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>Cargando Terminal...</p>
            </div>
        </div>
    );

    const handleSaveProfile = async () => {
        await updateProfile(editForm);
        setEditMode(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    const statsCards = [
        { title: 'Lecciones Vistas', value: progress.lessons?.length || progress.completedLessons?.length || 0, total: 60, color: 'primary' },
        { title: 'Tests de Conocimiento', value: progress.quizzes?.length || 0, total: 25, color: 'blue' },
        { title: 'Proyectos Labs', value: progress.projects?.length || progress.completedProjects?.length || 0, total: 20, color: 'purple' },
        { title: 'Challenges CTF', value: progress.challenges?.length || 0, total: 50, color: 'red' },
    ];

    const activityItems = [
        { icon: '📖', text: `Completaste "${progress.lessons?.[progress.lessons.length - 1]?.split('/')?.pop() || 'tu primera lección'}"`, time: 'Reciente' },
        { icon: '🎯', text: `Rango actual: Nivel ${progress.level}`, time: 'Ahora' },
        { icon: '🧪', text: `Quizzes resueltos: ${progress.quizzes?.length || 0}`, time: 'Hoy' },
        { icon: '🛡️', text: 'Terminal de seguridad activa', time: 'Estado: OK' },
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
            <Head>
                <title>Dashboard | Ciberseguridad Digital</title>
            </Head>
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Sidebar left */}
                    <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                    {/* Main Content Area */}
                    <div className="flex-1 min-w-0 w-full">
                        {/* TAB: Panel Principal */}
                        {activeTab === 'panel' && (
                            <div className="animate-fade-in">
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                    {statsCards.map(stat => (
                                        <StatCard key={stat.title} {...stat} />
                                    ))}
                                </div>

                                {/* Badges & Activity */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <section className="lg:col-span-2">
                                        <h3 className="text-xl font-black mb-6" style={{ color: 'var(--color-text)' }}>🏆 Badges de Honor</h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {(progress.badges || []).map(badge => (
                                                <div key={badge} className="aspect-square rounded-3xl flex flex-col items-center justify-center gap-3 group hover:scale-105 transition-all cursor-default" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: 'var(--gradient-primary)', opacity: 0.15 }}>
                                                        <svg className="w-7 h-7" style={{ color: 'var(--color-primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{badge}</span>
                                                </div>
                                            ))}
                                            <div className="aspect-square rounded-3xl flex flex-col items-center justify-center gap-3 opacity-40" style={{ border: '2px dashed var(--color-border)' }}>
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-2xl" style={{ border: '2px dashed var(--color-border)', color: 'var(--color-text-muted)' }}>+</div>
                                                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Bloqueado</span>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="p-8 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                        <h3 className="text-lg font-black mb-6" style={{ color: 'var(--color-text)' }}>📋 Actividad Reciente</h3>
                                        <div className="space-y-6">
                                            {activityItems.map((item, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ backgroundColor: 'var(--color-badge-bg)' }}>{item.icon}</div>
                                                    <div>
                                                        <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{item.text}</p>
                                                        <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--color-text-muted)' }}>{item.time}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}

                        {/* TAB: Laboratorio CTF */}
                        {activeTab === 'laboratorio' && (
                            <div className="animate-fade-in">
                                <div className="p-12 md:p-24 rounded-[48px] border-2 border-dashed flex flex-col items-center text-center gap-8 relative overflow-hidden group" 
                                    style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-elevation)' }}>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                                    <div className="w-32 h-32 rounded-[40px] bg-blue-500/10 flex items-center justify-center text-6xl shadow-2xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500 rotate-3">🧪</div>
                                    <div className="max-w-xl">
                                        <h3 className="text-4xl font-black mb-4 tracking-tighter" style={{ color: 'var(--color-text)' }}>Laboratorio CTF Central</h3>
                                        <p className="text-lg font-medium leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                            Estamos calibrando las máquinas virtuales y los firewalls del coliseo. 
                                            Pronto podrás participar en operaciones reales de Red Team y Blue Team.
                                        </p>
                                    </div>
                                    <button onClick={() => router.push('/playground')} className="btn-3d btn-3d-primary px-12 py-5 text-sm uppercase tracking-widest font-black">
                                        🚀 Abrir Terminal de Práctica
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* TAB: Certificados */}
                        {activeTab === 'certificados' && (
                            <div className="animate-fade-in">
                                <div className="p-12 md:p-24 rounded-[48px] border-2 border-dashed flex flex-col items-center text-center gap-8 relative overflow-hidden group" 
                                    style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-elevation)' }}>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                                    <div className="w-32 h-32 rounded-[40px] bg-yellow-500/10 flex items-center justify-center text-6xl shadow-2xl shadow-yellow-500/20 group-hover:scale-110 transition-transform duration-500 -rotate-3">🎓</div>
                                    <div className="max-w-xl">
                                        <h3 className="text-4xl font-black mb-4 tracking-tighter" style={{ color: 'var(--color-text)' }}>Tus Logros Académicos</h3>
                                        <p className="text-lg font-medium leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                            Tus credenciales están siendo procesadas por la autoridad certificadora. 
                                            Completa los exámenes finales para desbloquear tus diplomas en formato PDF y Blockchain.
                                        </p>
                                    </div>
                                    <button onClick={() => setActiveTab('progreso')} className="btn-3d btn-3d-outline px-12 py-5 text-sm uppercase tracking-widest font-black">
                                        📈 Ver Requisitos de Certificación
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* TAB: Notificaciones */}
                        {activeTab === 'notificaciones' && (
                            <div className="animate-fade-in space-y-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-2xl font-black" style={{ color: 'var(--color-text)' }}>🔔 Notificaciones</h3>
                                    <button className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-muted)' }}>Marcar todas como leídas</button>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { icon: '🚀', title: '¡Bienvenido al Nivel Legendario!', desc: 'Has completado satisfactoriamente tus primeros desafíos. Tu rango ha sido actualizado.', time: 'Hace 5 min', color: '#3b82f6' },
                                        { icon: '📰', title: 'Nueva lección disponible: SQL Injection', desc: 'Aprende a proteger tus bases de datos con nuestra nueva guía práctica.', time: 'Ayer', color: '#8b5cf6' },
                                        { icon: '🏆', title: 'Badge de Honor: Criptógrafo', desc: 'Felicidades, has obtenido una nueva insignia por tus logros en criptografía.', time: 'Hace 2 días', color: '#eab308' },
                                    ].map((n, i) => (
                                        <div key={i} className="p-6 rounded-3xl flex gap-6 hover:scale-[1.01] transition-all cursor-pointer" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: `${n.color}15`, color: n.color }}>{n.icon}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <h4 className="font-black text-base truncate" style={{ color: 'var(--color-text)' }}>{n.title}</h4>
                                                    <span className="text-[10px] font-bold uppercase whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{n.time}</span>
                                                </div>
                                                <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{n.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB: Proyectos & Tools */}
                        {activeTab === 'proyectos' && (
                            <div className="animate-fade-in space-y-8">
                                <div className="p-10 rounded-[40px] gradient-bg text-white relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-black mb-2">Herramientas de Integración</h3>
                                        <p className="opacity-80 max-w-lg font-medium">Explora proyectos reales creados por la comunidad y herramientas premium listas para desplegar.</p>
                                    </div>
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { title: 'Scanner de Vulnerabilidades', tech: 'Python + SQL', desc: 'Herramienta automatizada para detectar inyecciones SQL en aplicaciones web.', icon: '🔍' },
                                        { title: 'Sistema de Chat Encriptado', tech: 'Node.js + WebSockets', desc: 'Arquitectura de comunicación segura con cifrado extremo a extremo.', icon: '💬' },
                                    ].map((p, i) => (
                                        <div key={i} className="p-8 rounded-[32px] group hover:scale-[1.02] transition-all" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-6 shadow-xl" style={{ backgroundColor: 'var(--color-badge-bg)' }}>{p.icon}</div>
                                            <h4 className="text-lg font-black mb-1" style={{ color: 'var(--color-text)' }}>{p.title}</h4>
                                            <span className="text-[10px] font-black uppercase text-blue-500 mb-4 block">{p.tech}</span>
                                            <p className="text-sm font-medium mb-6 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{p.desc}</p>
                                            <button className="w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest border-2 transition-all hover:bg-[var(--color-primary)] hover:text-white" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>Explorar Proyecto</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB: Noticias */}
                        {activeTab === 'noticias' && (
                            <div className="animate-fade-in space-y-8">
                                <h3 className="text-2xl font-black" style={{ color: 'var(--color-text)' }}>🌐 Últimas Noticias Ciberseguridad</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    {[
                                        { title: 'Ciberataque masivo detectado en servidores gubernamentales', date: '11 Marzo, 2026', tag: 'Brecha de Seguridad', color: '#ef4444' },
                                        { title: 'Nuevas tendencias en Ransomware as a Service (RaaS)', date: '10 Marzo, 2026', tag: 'Tendencias', color: '#eab308' },
                                        { title: 'La inteligencia artificial revoluciona la detección de malware', date: '09 Marzo, 2026', tag: 'Tecnología', color: '#22c55e' },
                                    ].map((n, i) => (
                                        <div key={i} className="p-8 rounded-[32px] flex flex-col md:flex-row gap-6 items-start md:items-center" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest" style={{ backgroundColor: `${n.color}15`, color: n.color }}>{n.tag}</span>
                                                    <span className="text-xs font-bold" style={{ color: 'var(--color-text-muted)' }}>{n.date}</span>
                                                </div>
                                                <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>{n.title}</h4>
                                                <p className="text-sm font-medium leading-relaxed opacity-70" style={{ color: 'var(--color-text-muted)' }}>Análisis detallado de los eventos recientes y cómo afectan al panorama global de la seguridad digital.</p>
                                            </div>
                                            <button className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text)' }}>Leer más →</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB: Ciberseguridad specialized */}
                        {activeTab === 'ciberseguridad' && (
                            <div className="animate-fade-in">
                                <div className="p-12 md:p-24 rounded-[48px] border-2 border-dashed flex flex-col items-center text-center gap-8 relative overflow-hidden group" 
                                    style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-elevation)' }}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                                    <div className="w-32 h-32 rounded-[40px] bg-blue-500/10 flex items-center justify-center text-6xl shadow-2xl group-hover:scale-110 transition-transform duration-500">🛡️</div>
                                    <div className="max-w-xl relative z-10">
                                        <h3 className="text-4xl font-black mb-4 tracking-tighter" style={{ color: 'var(--color-text)' }}>Módulo de Ciberseguridad Avanzada</h3>
                                        <p className="text-lg font-medium leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                            Domina las técnicas de Hacking Ético, Análisis Forense y Hardening de servidores. 
                                            Aquí encontrarás contenido exclusivo para expertos en seguridad.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
                                        {['Red Team', 'Blue Team', 'Forense', 'Pentesting'].map(tag => (
                                            <div key={tag} className="py-4 rounded-2xl font-black text-xs uppercase bg-white/5 border border-white/10" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text)' }}>{tag}</div>
                                        ))}
                                    </div>
                                    <button onClick={() => router.push('/course/cybersecurity')} className="btn-3d btn-3d-primary px-12 py-5 text-sm uppercase tracking-widest font-black">
                                        🔑 Desbloquear Contenido Experto
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* TAB: Programación specialized */}
                        {activeTab === 'programacion' && (
                            <div className="animate-fade-in">
                                <div className="p-12 md:p-24 rounded-[48px] border-2 border-dashed flex flex-col items-center text-center gap-8 relative overflow-hidden group" 
                                    style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-elevation)' }}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
                                    <div className="w-32 h-32 rounded-[40px] bg-purple-500/10 flex items-center justify-center text-6xl shadow-2xl group-hover:scale-110 transition-transform duration-500">💻</div>
                                    <div className="max-w-xl relative z-10">
                                        <h3 className="text-4xl font-black mb-4 tracking-tighter" style={{ color: 'var(--color-text)' }}>Academia de Programación</h3>
                                        <p className="text-lg font-medium leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                            Aprende a construir aplicaciones seguras desde cero. 
                                            Python, JavaScript, Go y C++ con enfoque en seguridad ofensiva y defensiva.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
                                        {['Python', 'JavaScript', 'Go Lang', 'Rust'].map(tag => (
                                            <div key={tag} className="py-4 rounded-2xl font-black text-xs uppercase bg-white/5 border border-white/10" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text)' }}>{tag}</div>
                                        ))}
                                    </div>
                                    <button onClick={() => router.push('/course/programming')} className="btn-3d btn-3d-primary px-12 py-5 text-sm uppercase tracking-widest font-black">
                                        🚀 Comenzar a Construir
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* TAB: Mi Perfil */}
                        {activeTab === 'perfil' && (
                            <div className="animate-fade-in max-w-2xl mx-auto">
                                <div className="p-8 md:p-10 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-black" style={{ color: 'var(--color-text)' }}>Información del Perfil</h3>
                                        {!editMode && (
                                            <button onClick={() => setEditMode(true)} className="btn-3d btn-3d-primary px-5 py-2 text-xs">
                                                ✏️ Editar
                                            </button>
                                        )}
                                    </div>

                                    {saveSuccess && (
                                        <div className="mb-6 p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--color-badge-bg)', border: '1px solid var(--color-primary)' }}>
                                            <p className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>✅ Perfil actualizado correctamente</p>
                                        </div>
                                    )}

                                    {editMode ? (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest mb-2 block" style={{ color: 'var(--color-text-muted)' }}>Nombre para mostrar</label>
                                                <input
                                                    type="text"
                                                    value={editForm.display_name}
                                                    onChange={(e) => setEditForm({ ...editForm, display_name: e.target.value })}
                                                    className="w-full px-6 py-4 rounded-2xl text-sm outline-none transition-all font-medium"
                                                    style={{ backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                                                    placeholder="Tu nombre"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-widest mb-2 block" style={{ color: 'var(--color-text-muted)' }}>Biografía</label>
                                                <textarea
                                                    value={editForm.bio}
                                                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                                    className="w-full px-6 py-4 rounded-2xl text-sm outline-none transition-all font-medium resize-none min-h-[120px]"
                                                    style={{ backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                                                    placeholder="Cuéntanos sobre ti..."
                                                />
                                            </div>
                                            <div className="flex gap-4">
                                                <button onClick={handleSaveProfile} className="btn-3d btn-3d-primary px-8 py-3 text-xs flex-1">
                                                    💾 Guardar Cambios
                                                </button>
                                                <button onClick={() => { setEditMode(false); setEditForm({ display_name: profile.display_name, bio: profile.bio }); }} className="btn-3d btn-3d-outline px-6 py-3 text-xs">
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <InfoRow label="Nombre" value={profile.display_name || 'Sin definir'} />
                                            <InfoRow label="Email" value={user.email} />
                                            <InfoRow label="Biografía" value={profile.bio || 'Sin biografía aún'} />
                                            <InfoRow label="Rol" value={profile.role === 'admin' ? '🛡️ Administrador' : profile.role === 'superadmin' ? '👑 Superadministrador' : '👤 Usuario'} />
                                            
                                            <div className="pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
                                                <h4 className="text-[10px] font-black uppercase tracking-widest mb-6" style={{ color: 'var(--color-text-muted)' }}>Progreso de Rango (Niveles)</h4>
                                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                                                    {[1, 2, 3, 4, 5, 6].map((lvl) => {
                                                        const isCurrent = progress.level === lvl;
                                                        const isUnlocked = progress.level >= lvl;
                                                        return (
                                                            <div 
                                                                key={lvl} 
                                                                className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${isCurrent ? 'scale-110 shadow-xl z-10' : ''}`}
                                                                style={{ 
                                                                    backgroundColor: isCurrent ? '#000000' : isUnlocked ? 'var(--color-badge-bg)' : 'var(--color-surface)',
                                                                    border: isCurrent ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                                                                    color: isCurrent ? '#ffffff' : isUnlocked ? 'var(--color-text)' : 'var(--color-text-muted)',
                                                                    opacity: isUnlocked ? 1 : 0.5
                                                                }}
                                                            >
                                                                <span className="text-[10px] font-black">Lvl {lvl}</span>
                                                                <span className="text-[7px] font-bold uppercase">{isCurrent ? 'ACTUAL' : isUnlocked ? 'OK' : 'LOCK'}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="mt-8 p-6 rounded-3xl bg-primary-500/5 border border-primary-500/10">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Puntos de Experiencia</span>
                                                        <span className="text-xl font-black" style={{ color: 'var(--color-primary)' }}>{(progress.xp || 0).toLocaleString()} XP</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary-500 transition-all duration-1000" style={{ width: `${Math.min(((progress.xp || 0) / getNextLevelTarget(progress.level || 1)) * 100, 100)}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* TAB: Planes & VIP */}
                        {activeTab === 'planes' && (
                            <div className="space-y-8 animate-fade-in pb-10">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-2xl md:text-3xl font-black gradient-text">💎 Planes & Suscripciones VIP</h2>
                                    <p className="text-sm font-medium opacity-70" style={{ color: 'var(--color-text-muted)' }}>Desbloquea el máximo potencial de tu carrera en ciberseguridad</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                                    {/* Basic Plan */}
                                    <div className="p-8 rounded-[32px] glass flex flex-col items-center text-center transition-all duration-500 hover:scale-[1.02] border border-white/5 relative group" style={{ backgroundColor: 'var(--color-surface)', height: '100%' }}>
                                        <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-xl">
                                            <span className="text-3xl text-white">👤</span>
                                        </div>
                                        <h3 className="text-xl font-black mb-2" style={{ color: 'var(--color-text)' }}>{t('pricing.free.name')}</h3>
                                        <p className="text-3xl font-black mb-6" style={{ color: 'var(--color-text)' }}>$0 <span className="text-xs opacity-50 uppercase tracking-widest">{t('pricing.period.forever')}</span></p>
                                        
                                        <ul className="w-full space-y-4 mb-10 text-sm font-medium text-left" style={{ color: 'var(--color-text)' }}>
                                            <li className="flex items-center gap-3"><span className="text-green-500">✓</span> {t('pricing.free.feat1')}</li>
                                            <li className="flex items-center gap-3"><span className="text-green-500">✓</span> {t('pricing.free.feat2')}</li>
                                            <li className="flex items-center gap-3 opacity-30"><span className="text-gray-400">✕</span> {t('pricing.premium.feat1')}</li>
                                            <li className="flex items-center gap-3 opacity-30"><span className="text-gray-400">✕</span> {t('pricing.vip.feat2')}</li>
                                        </ul>

                                        <button className="w-full py-4 mt-auto rounded-2xl font-black text-[10px] uppercase tracking-widest border border-primary-500/30 text-primary-500 opacity-70 cursor-default">
                                            {t('pricing.free.btn')}
                                        </button>
                                    </div>

                                    {/* Premium Plan */}
                                    <div className="p-8 rounded-[32px] flex flex-col items-center text-center transition-all duration-500 hover:scale-[1.05] border-2 border-primary-500/30 relative group shadow-2xl shadow-primary-500/10" style={{ backgroundColor: '#000000', color: '#ffffff', height: '100%' }}>
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full gradient-bg text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                                            {t('pricing.badge_recommended')}
                                        </div>
                                        <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center mb-6 shadow-2xl group-hover:rotate-6 transition-transform">
                                            <span className="text-4xl text-white">✨</span>
                                        </div>
                                        <h3 className="text-2xl font-black mb-2 text-white">{t('pricing.premium.name')}</h3>
                                        <p className="text-4xl font-black mb-6 text-white">$29 <span className="text-xs opacity-50 uppercase tracking-widest">USD {t('pricing.period.monthly')}</span></p>
                                        
                                        <ul className="w-full space-y-4 mb-10 text-sm font-medium text-left text-white/80">
                                            <li className="flex items-center gap-3"><span className="text-primary-500 font-bold">✓</span> {t('pricing.premium.feat1')}</li>
                                            <li className="flex items-center gap-3"><span className="text-primary-500 font-bold">✓</span> {t('pricing.premium.feat2')}</li>
                                            <li className="flex items-center gap-3"><span className="text-primary-500 font-bold">✓</span> {t('pricing.premium.feat3')}</li>
                                            <li className="flex items-center gap-3"><span className="text-primary-500 font-bold">✓</span> {t('pricing.premium.feat4')}</li>
                                        </ul>

                                        <button className="w-full py-4 mt-auto rounded-2xl font-black text-[10px] uppercase tracking-widest gradient-bg text-white shadow-xl hover:shadow-primary-500/30 transition-all hover:scale-105 active:scale-95">
                                            {t('pricing.premium.btn')}
                                        </button>
                                    </div>

                                    {/* VIP Plan */}
                                    <div className="p-8 rounded-[32px] glass flex flex-col items-center text-center transition-all duration-500 hover:scale-[1.02] border border-white/5 relative group" style={{ backgroundColor: 'var(--color-surface)', height: '100%' }}>
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center mb-6 shadow-xl">
                                            <span className="text-3xl text-white">👑</span>
                                        </div>
                                        <h3 className="text-xl font-black mb-2" style={{ color: 'var(--color-text)' }}>{t('pricing.vip.name')}</h3>
                                        <p className="text-3xl font-black mb-6" style={{ color: 'var(--color-text)' }}>$99 <span className="text-xs opacity-50 uppercase tracking-widest">USD {t('pricing.period.forever')}</span></p>
                                        
                                        <ul className="w-full space-y-4 mb-10 text-sm font-medium text-left" style={{ color: 'var(--color-text)' }}>
                                            <li className="flex items-center gap-3"><span className="text-yellow-500">✓</span> {t('pricing.vip.feat1')}</li>
                                            <li className="flex items-center gap-3"><span className="text-yellow-500">✓</span> {t('pricing.vip.feat2')}</li>
                                            <li className="flex items-center gap-3"><span className="text-yellow-500">✓</span> {t('pricing.vip.feat3')}</li>
                                            <li className="flex items-center gap-3"><span className="text-yellow-500">✓</span> {t('pricing.vip.feat4')}</li>
                                        </ul>

                                        <button className="w-full py-4 mt-auto rounded-2xl font-black text-[10px] uppercase tracking-widest border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all shadow-lg shadow-yellow-500/10 active:scale-95">
                                            {t('pricing.vip.btn')}
                                        </button>
                                    </div>
                                </div>

                                {/* Secure Payment Proof */}
                                <div className="p-8 rounded-3xl glass flex items-center justify-center gap-8 opacity-60 flex-wrap" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                    <div className="flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                                        <svg className="w-5 h-5 opacity-40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"/></svg>
                                        <span className="text-[10px] font-black uppercase tracking-widest">Pago Seguro SSL</span>
                                    </div>
                                    <div className="flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                                        <svg className="w-5 h-5 opacity-40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                                        <span className="text-[10px] font-black uppercase tracking-widest">Garantía de Satisfacción</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: Progreso */}
                        {activeTab === 'progreso' && (
                            <div className="animate-fade-in">
                                {/* XP Progress Bar */}
                                <div className="p-8 rounded-3xl mb-8" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-black" style={{ color: 'var(--color-text)' }}>Experiencia Total</h3>
                                        <span className="text-2xl font-black" style={{ color: 'var(--color-primary)' }}>{progress.xp || 0} XP</span>
                                    </div>
                                    <div className="h-4 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-badge-bg)' }}>
                                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(((progress.xp || 0) / getNextLevelTarget(progress.level || 1)) * 100, 100)}%`, background: 'var(--gradient-primary)' }}></div>
                                    </div>
                                    <p className="text-xs mt-3 font-bold" style={{ color: 'var(--color-text-muted)' }}>
                                        {progress.level >= 6 ? '¡Nivel máximo alcanzado!' : `${getNextLevelTarget(progress.level || 1) - (progress.xp || 0)} XP para el siguiente nivel`}
                                    </p>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                    {statsCards.map(stat => (
                                        <StatCard key={stat.title} {...stat} />
                                    ))}
                                </div>

                                {/* Streak & Badges */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-3xl text-center" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                        <p className="text-6xl font-black mb-2" style={{ color: 'var(--color-primary)' }}>🔥 {progress.streak}</p>
                                        <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Días de racha activa</p>
                                    </div>
                                    <div className="p-8 rounded-3xl text-center" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                        <p className="text-6xl font-black mb-2" style={{ color: 'var(--color-primary)' }}>🏅 {progress.badges?.length || 0}</p>
                                        <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Badges obtenidos</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: Configuración */}
                        {activeTab === 'config' && (
                            <div className="animate-fade-in max-w-2xl mx-auto space-y-6">
                                <div className="p-8 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                    <h3 className="text-lg font-black mb-6" style={{ color: 'var(--color-text)' }}>🔑 Seguridad de la Cuenta</h3>
                                    <div className="space-y-4">
                                        <InfoRow label="Email" value={user.email} />
                                        <InfoRow label="Proveedor" value="Supabase Auth" />
                                        <InfoRow label="Verificado" value="✅ Confirmado" />
                                    </div>
                                </div>

                                <div className="p-8 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                    <h3 className="text-lg font-black mb-6" style={{ color: 'var(--color-text)' }}>🎨 Preferencias</h3>
                                    <p className="text-sm font-medium mb-4" style={{ color: 'var(--color-text-muted)' }}>
                                        Puedes cambiar el tema y el idioma desde los botones en la barra de navegación superior.
                                    </p>
                                </div>

                                <div className="p-8 rounded-3xl" style={{ border: '1px solid rgba(239,68,68,0.3)', backgroundColor: 'rgba(239,68,68,0.05)' }}>
                                    <h3 className="text-lg font-black mb-4 text-red-500">⚠️ Zona de peligro</h3>
                                    <p className="text-sm font-medium mb-6" style={{ color: 'var(--color-text-muted)' }}>
                                        Al cerrar sesión perderás el acceso temporal a tu dashboard.
                                    </p>
                                    <button
                                        onClick={signOut}
                                        className="px-8 py-3 rounded-2xl bg-red-500 text-white font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function StatCard({ title, value, total, color }) {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    const colorMap = {
        primary: 'var(--color-primary)',
        purple: '#8b5cf6',
        green: '#22c55e',
        red: '#ef4444',
        blue: '#3b82f6'
    };

    return (
        <div className="p-6 rounded-3xl hover:scale-[1.02] transition-all" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-elevation)' }}>
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)' }}>{title}</h4>
            <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-black" style={{ color: 'var(--color-text)' }}>{value}</span>
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>/ {total}</span>
            </div>
            <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-badge-bg)' }}>
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${percentage}%`, backgroundColor: colorMap[color] }}></div>
            </div>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <span className="text-[10px] font-black uppercase tracking-widest sm:w-32 shrink-0" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{value}</span>
        </div>
    );
}
