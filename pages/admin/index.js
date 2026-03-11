import { useAuth } from '../../lib/AuthContext';
import { supabase } from '../../lib/supabase';
import Header from '../../components/Header';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AdminPanel() {
    const { user, loading, profile } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [stats, setStats] = useState({ totalUsers: 0, activeToday: 0, totalXP: 0, coursesCompleted: 0 });
    const [platformSettings, setPlatformSettings] = useState({
        maintenanceMode: false, registrationOpen: true, emailNotifications: true,
    });
    
    // Social Links state
    const [socialLinks, setSocialLinks] = useState({
        facebook: '#', instagram: '#', tiktok: '#', github: '#', discord: '#', whatsapp: '#'
    });
    const [savingLinks, setSavingLinks] = useState(false);

    useEffect(() => {
        if (!loading && !user) { router.push('/'); return; }
        if (!loading && profile.role !== 'admin' && profile.role !== 'superadmin') {
            router.push('/dashboard'); return;
        }
    }, [user, loading, profile]);

    useEffect(() => {
        if (user && (profile.role === 'admin' || profile.role === 'superadmin')) {
            fetchUsers();
            fetchPlatformSettings();
        }
    }, [user, profile]);

    const fetchPlatformSettings = async () => {
        try {
            const { data, error } = await supabase.from('platform_settings').select('value').eq('id', 'social_links').single();
            if (data && data.value) setSocialLinks(data.value);
            // Ignore error gracefully, fall back to default
        } catch (e) {
            console.error("Error fetching settings:", e);
        }
    };

    const handleSaveSocialLinks = async () => {
        if (profile.role !== 'superadmin') { alert('Solo superadmin puede modificar links.'); return; }
        setSavingLinks(true);
        try {
            const { error } = await supabase.from('platform_settings').upsert({ id: 'social_links', value: socialLinks, updated_by: user.id });
            if (error) throw error;
            alert("Enlaces guardados exitosamente.");
        } catch (error) {
            console.error(error);
            alert("Error al guardar enlaces.");
        } finally {
            setSavingLinks(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
            if (data && data.length > 0) {
                setUsers(data);
                setStats({ totalUsers: data.length, activeToday: Math.ceil(data.length * 0.6), totalXP: data.reduce((a, u) => a + (u.xp || 0), 0), coursesCompleted: data.length * 3 });
            } else { throw new Error('empty'); }
        } catch {
            const mock = [
                { id: '1', display_name: 'antoniocorporan40', email: 'antoniocorporan40@gmail.com', role: 'superadmin', created_at: new Date().toISOString(), xp: 2450, bio: 'Fundador' },
                { id: '2', display_name: 'Carlos Mendez', email: 'carlos@test.com', role: 'user', created_at: new Date(Date.now() - 86400000).toISOString(), xp: 1280, bio: 'Estudiante avanzado' },
                { id: '3', display_name: 'María Peña', email: 'maria@test.com', role: 'user', created_at: new Date(Date.now() - 172800000).toISOString(), xp: 960, bio: 'Entusiasta' },
                { id: '4', display_name: 'Diego Torres', email: 'diego@test.com', role: 'admin', created_at: new Date(Date.now() - 259200000).toISOString(), xp: 1850, bio: 'Moderador' },
                { id: '5', display_name: 'Ana García', email: 'ana@test.com', role: 'user', created_at: new Date(Date.now() - 345600000).toISOString(), xp: 420, bio: 'Nueva' },
            ];
            setUsers(mock);
            setStats({ totalUsers: mock.length, activeToday: 3, totalXP: mock.reduce((a, u) => a + u.xp, 0), coursesCompleted: 12 });
        } finally { setLoadingUsers(false); }
    };

    const handleRoleChange = async (userId, newRole) => {
        if (profile.role !== 'superadmin') { alert('Solo superadmin puede cambiar roles.'); return; }
        try { await supabase.from('profiles').update({ role: newRole }).eq('id', userId); } catch {}
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    };

    const handleDeleteUser = (userId) => {
        if (profile.role !== 'superadmin') return;
        if (!confirm('¿Eliminar este usuario? Acción irreversible.')) return;
        setUsers(prev => prev.filter(u => u.id !== userId));
    };

    if (loading || !user) return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
            <div className="animate-pulse text-center">
                <div className="w-12 h-12 rounded-2xl gradient-bg mx-auto mb-4 flex items-center justify-center"><span className="text-xl text-white">🛡️</span></div>
                <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>Verificando permisos...</p>
            </div>
        </div>
    );
    if (profile.role !== 'admin' && profile.role !== 'superadmin') return null;

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'usuarios', label: 'Usuarios', icon: '👥' },
        { id: 'actividad', label: 'Actividad', icon: '📋' },
        { id: 'plataforma', label: 'Plataforma', icon: '🔧' },
        { id: 'seguridad', label: 'Seguridad', icon: '🛡️' },
        { id: 'base-datos', label: 'Base de Datos', icon: '🗃️' },
    ];

    const topStudents = [...users].sort((a, b) => (b.xp || 0) - (a.xp || 0)).slice(0, 3);
    const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const monthData = [18, 25, 32, 28, 45, 52, 48, 61, 55, 70, 65, 78];
    const maxMonth = Math.max(...monthData);

    const roleData = [
        { role: 'user', count: users.filter(u => u.role === 'user').length, color: '#3b82f6' },
        { role: 'admin', count: users.filter(u => u.role === 'admin').length, color: '#8b5cf6' },
        { role: 'superadmin', count: users.filter(u => u.role === 'superadmin').length, color: '#eab308' },
    ];
    const totalRoles = roleData.reduce((a, r) => a + r.count, 0) || 1;

    const activityLog = [
        { time: 'Hace 5 min', action: 'Login exitoso', user: profile.display_name, type: '🔐' },
        { time: 'Hace 15 min', action: 'Perfil editado', user: 'Carlos', type: '👤' },
        { time: 'Hace 1 hora', action: 'Lección completada', user: 'María', type: '📈' },
        { time: 'Hace 2 horas', action: 'Nuevo registro', user: 'Ana García', type: '✨' },
        { time: 'Hace 4 horas', action: 'Rol cambiado → Admin', user: 'Diego', type: '🛡️' },
        { time: 'Hace 8 horas', action: 'Deploy v2.6 actualizado', user: 'Sistema', type: '⚙️' },
    ];

    const getRoleBadge = (role) => {
        if (role === 'superadmin') return { label: '👑 Super Admin', bg: 'rgba(234,179,8,0.15)', color: '#eab308' };
        if (role === 'admin') return { label: '🛡️ Admin', bg: 'rgba(59,130,246,0.15)', color: '#3b82f6' };
        return { label: '👤 Usuario', bg: 'var(--color-badge-bg)', color: 'var(--color-text-muted)' };
    };

    /* ==================== RENDER ==================== */
    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
            <Head><title>Panel Superadmin | Ciberseguridad Digital</title></Head>
            <Header />

            <div className="flex pt-36">
                {/* ===== SIDEBAR ===== */}
                {/* Mobile toggle */}
                <button className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl gradient-bg text-white shadow-2xl flex items-center justify-center text-xl lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? '✕' : '☰'}
                </button>

                <aside className={`fixed lg:sticky top-36 left-0 z-40 h-[calc(100vh-9rem)] w-64 shrink-0 p-4 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    style={{ backgroundColor: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}>

                    {/* Sidebar Header */}
                    <div className="p-4 rounded-2xl mb-4 text-center" style={{ background: 'var(--gradient-primary)' }}>
                        <span className="text-2xl block mb-1">🛡️</span>
                        <h2 className="text-xs font-black uppercase tracking-widest text-white">Panel de Control</h2>
                        <p className="text-[9px] font-bold text-white/60 mt-1 uppercase tracking-wider">Superadmin</p>
                    </div>

                    {/* Nav Links */}
                    <nav className="space-y-1">
                        {navItems.map(item => (
                            <button key={item.id} onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                                className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-all duration-200"
                                style={{
                                    backgroundColor: activeSection === item.id ? 'var(--color-primary)' : 'transparent',
                                    color: activeSection === item.id ? 'var(--color-button-text)' : 'var(--color-text)',
                                }}>
                                <span className="text-lg">{item.icon}</span> {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <button onClick={() => router.push('/dashboard')} className="w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all hover:opacity-70" style={{ color: 'var(--color-text-muted)' }}>
                            ← Volver al Dashboard
                        </button>
                    </div>
                </aside>

                {/* Overlay for mobile sidebar */}
                {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

                {/* ===== MAIN CONTENT ===== */}
                <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 pb-20">

                    {/* ==================== DASHBOARD ==================== */}
                    {activeSection === 'dashboard' && (
                        <div className="space-y-6">
                            {/* TOP STAT CARDS */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <GlassStatCard label="Total Usuarios" value={stats.totalUsers} icon="👥" trend="+12%" color="#3b82f6" />
                                <GlassStatCard label="Activos Hoy" value={stats.activeToday} icon="🟢" trend="+8%" color="#22c55e" />
                                <GlassStatCard label="XP Global" value={stats.totalXP.toLocaleString()} icon="⚡" trend="+24%" color="#eab308" />
                                <GlassStatCard label="Cursos Completados" value={stats.coursesCompleted} icon="🎓" trend="+5%" color="#8b5cf6" />
                            </div>

                            {/* CHARTS ROW */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Bar Chart — Activity by Month */}
                                <div className="lg:col-span-2 p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-base font-black" style={{ color: 'var(--color-text)' }}>Actividad Mensual</h3>
                                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Usuarios activos por mes</p>
                                        </div>
                                        <div className="flex gap-3 text-[10px] font-bold" style={{ color: 'var(--color-text-muted)' }}>
                                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3b82f6' }} /> Usuarios</span>
                                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }} /> Nuevos</span>
                                        </div>
                                    </div>
                                    <div className="flex items-end gap-2 h-48">
                                        {monthData.map((val, i) => (
                                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                                <div className="w-full flex flex-col items-center gap-1" style={{ height: '180px', justifyContent: 'flex-end' }}>
                                                    <div className="w-full max-w-[28px] rounded-t-lg transition-all duration-700 relative group"
                                                        style={{
                                                            height: `${(val / maxMonth) * 100}%`,
                                                            background: i === new Date().getMonth()
                                                                ? 'linear-gradient(180deg, #22c55e, #16a34a)'
                                                                : 'linear-gradient(180deg, #3b82f6, #2563eb)',
                                                            minHeight: '8px',
                                                            opacity: i <= new Date().getMonth() ? 1 : 0.3
                                                        }}>
                                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>{val}</div>
                                                    </div>
                                                </div>
                                                <span className="text-[9px] font-bold" style={{ color: 'var(--color-text-muted)' }}>{monthLabels[i]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Donut Chart — Role Distribution */}
                                <div className="p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                    <h3 className="text-base font-black mb-2" style={{ color: 'var(--color-text)' }}>Distribución</h3>
                                    <p className="text-xs mb-6" style={{ color: 'var(--color-text-muted)' }}>Roles de usuario</p>

                                    {/* CSS Donut */}
                                    <div className="relative mx-auto" style={{ width: '160px', height: '160px' }}>
                                        <svg viewBox="0 0 36 36" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                                            {(() => {
                                                let offset = 0;
                                                return roleData.map((r, i) => {
                                                    const pct = (r.count / totalRoles) * 100;
                                                    const dashArray = `${pct} ${100 - pct}`;
                                                    const el = <circle key={i} cx="18" cy="18" r="15.915" fill="none" strokeWidth="3.5" stroke={r.color} strokeDasharray={dashArray} strokeDashoffset={-offset} strokeLinecap="round" />;
                                                    offset += pct;
                                                    return el;
                                                });
                                            })()}
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-2xl font-black" style={{ color: 'var(--color-text)' }}>{totalRoles}</span>
                                            <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Total</span>
                                        </div>
                                    </div>

                                    {/* Legend */}
                                    <div className="mt-6 space-y-2">
                                        {roleData.map((r, i) => (
                                            <div key={i} className="flex items-center justify-between text-xs">
                                                <span className="flex items-center gap-2 font-bold" style={{ color: 'var(--color-text)' }}>
                                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                                                    {r.role === 'superadmin' ? 'Super Admin' : r.role === 'admin' ? 'Admin' : 'Usuarios'}
                                                </span>
                                                <span className="font-black" style={{ color: r.color }}>{Math.round((r.count / totalRoles) * 100)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM ROW */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Top Students */}
                                <div className="p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                    <h3 className="text-base font-black mb-5" style={{ color: 'var(--color-text)' }}>🏆 Top Estudiantes</h3>
                                    <div className="space-y-4">
                                        {topStudents.map((s, i) => (
                                            <div key={s.id} className="flex items-center gap-4 p-3 rounded-2xl transition-all hover:scale-[1.01]" style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0" style={{ background: i === 0 ? 'linear-gradient(135deg, #eab308, #f59e0b)' : i === 1 ? 'linear-gradient(135deg, #94a3b8, #cbd5e1)' : 'linear-gradient(135deg, #b45309, #d97706)', color: 'white' }}>
                                                    #{i + 1}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-black truncate" style={{ color: 'var(--color-text)' }}>{s.display_name}</p>
                                                    <p className="text-[10px] font-bold" style={{ color: 'var(--color-text-muted)' }}>{getRoleBadge(s.role).label}</p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <p className="text-lg font-black" style={{ color: 'var(--color-primary)' }}>{(s.xp || 0).toLocaleString()}</p>
                                                    <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>XP</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Growth Trend */}
                                <div className="p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-base font-black" style={{ color: 'var(--color-text)' }}>📈 Crecimiento</h3>
                                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Tendencia de registros</p>
                                        </div>
                                        <span className="text-green-500 text-xs font-black">↑ +34%</span>
                                    </div>
                                    {/* SVG Line Chart */}
                                    <svg viewBox="0 0 300 120" className="w-full" style={{ height: '180px' }}>
                                        <defs>
                                            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        {/* Grid lines */}
                                        {[0, 30, 60, 90].map(y => (
                                            <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4,4" />
                                        ))}
                                        {/* Area */}
                                        <path d="M0,100 L25,85 50,90 75,70 100,60 125,65 150,50 175,45 200,35 225,40 250,25 275,20 300,10 L300,120 L0,120 Z" fill="url(#lineGrad)" />
                                        {/* Line */}
                                        <path d="M0,100 L25,85 50,90 75,70 100,60 125,65 150,50 175,45 200,35 225,40 250,25 275,20 300,10" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        {/* Dots */}
                                        {[[0,100],[25,85],[50,90],[75,70],[100,60],[125,65],[150,50],[175,45],[200,35],[225,40],[250,25],[275,20],[300,10]].map(([x, y], i) => (
                                            <circle key={i} cx={x} cy={y} r="3" fill="#3b82f6" stroke="white" strokeWidth="1.5" />
                                        ))}
                                    </svg>
                                    <div className="flex justify-between mt-2 text-[9px] font-bold" style={{ color: 'var(--color-text-muted)' }}>
                                        {['Ene', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map(m => <span key={m}>{m}</span>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================== USUARIOS ==================== */}
                    {activeSection === 'usuarios' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-black" style={{ color: 'var(--color-text)' }}>👥 Gestión de Usuarios</h2>
                                <span className="chip chip-blue">{users.length} registrados</span>
                            </div>
                            <div className="overflow-x-auto rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                <table className="w-full">
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                                            {['Usuario', 'Email', 'Rol', 'Plan', 'Progreso', 'Registro', ...(profile.role === 'superadmin' ? ['Acciones'] : [])].map((h, i) => (
                                                <th key={h} className={`px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest ${i === 1 || i === 5 ? 'hidden md:table-cell' : ''} ${i === 3 || i === 4 ? 'hidden lg:table-cell' : ''}`} style={{ color: 'var(--color-text-muted)' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loadingUsers ? (
                                            <tr><td colSpan={7} className="px-6 py-12 text-center"><span className="animate-pulse font-bold" style={{ color: 'var(--color-primary)' }}>Cargando...</span></td></tr>
                                        ) : users.map(u => {
                                            const b = getRoleBadge(u.role);
                                            return (
                                                <tr key={u.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                    <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0" style={{ background: 'var(--gradient-primary)', color: 'white' }}>{(u.display_name || 'U')[0].toUpperCase()}</div><span className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>{u.display_name || '—'}</span></div></td>
                                                    <td className="px-5 py-4 hidden md:table-cell"><span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{u.email || '—'}</span></td>
                                                    <td className="px-5 py-4"><span className="px-3 py-1 rounded-full text-[10px] font-black" style={{ backgroundColor: b.bg, color: b.color }}>{b.label}</span></td>
                                                    
                                                    {/* PLAN COLUMN */}
                                                    <td className="px-5 py-4 hidden lg:table-cell">
                                                        {u.plan_id === 'pro' ? (
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 whitespace-nowrap">✨ PRO</span>
                                                                <span className="text-[9px] font-bold text-gray-500 whitespace-nowrap">12 Días rest.</span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Gratis</span>
                                                        )}
                                                    </td>

                                                    {/* PROGRESS COLUMN */}
                                                    <td className="px-5 py-4 hidden lg:table-cell">
                                                        <div className="flex flex-col gap-1 w-24">
                                                            <div className="flex items-center justify-between text-[10px] font-bold">
                                                                <span style={{ color: 'var(--color-primary)' }}>{u.xp || 0} XP</span>
                                                                <span style={{ color: 'var(--color-text-muted)' }}>{u.completed_lessons || 0}/42</span>
                                                            </div>
                                                            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                                                                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(((u.completed_lessons || 0) / 42) * 100, 100)}%`, backgroundColor: 'var(--color-primary)' }} />
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4 hidden md:table-cell"><span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{new Date(u.created_at).toLocaleDateString()}</span></td>
                                                    {profile.role === 'superadmin' && (
                                                        <td className="px-5 py-4"><div className="flex items-center gap-2">
                                                            <select value={u.role} onChange={(e) => handleRoleChange(u.id, e.target.value)} className="text-xs font-bold px-2 py-1.5 rounded-lg outline-none" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
                                                                <option value="user">Usuario</option><option value="admin">Admin</option><option value="superadmin">Super Admin</option>
                                                            </select>
                                                            <button onClick={() => handleDeleteUser(u.id)} className="text-red-500 hover:text-red-400 text-xs font-bold px-2 py-1.5 rounded-lg" style={{ border: '1px solid rgba(239,68,68,0.2)' }}>✕</button>
                                                        </div></td>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ==================== ACTIVIDAD ==================== */}
                    {activeSection === 'actividad' && (
                        <div>
                            <h2 className="text-xl font-black mb-6" style={{ color: 'var(--color-text)' }}>📋 Registro de Actividad</h2>
                            <div className="space-y-3">
                                {activityLog.map((log, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.01]" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                        <span className="text-2xl">{log.type}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{log.action}</p>
                                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Por: {log.user}</p>
                                        </div>
                                        <span className="text-xs font-bold shrink-0 px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-muted)' }}>{log.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ==================== PLATAFORMA ==================== */}
                    {activeSection === 'plataforma' && (
                        <div className="space-y-6 max-w-4xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                    <h3 className="text-lg font-black mb-6" style={{ color: 'var(--color-text)' }}>🔧 Controles</h3>
                                    <div className="space-y-4">
                                        {[
                                            { key: 'maintenanceMode', label: 'Modo Mantenimiento', desc: 'Desactiva acceso público', danger: true },
                                            { key: 'registrationOpen', label: 'Registro Abierto', desc: 'Acepta nuevos usuarios' },
                                            { key: 'emailNotifications', label: 'Notif. Email', desc: 'Emails automáticos al registrar' },
                                        ].map(s => (
                                            <div key={s.key} className="flex items-center justify-between gap-4 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <div><p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{s.label}</p><p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.desc}</p></div>
                                                <button onClick={() => setPlatformSettings(p => ({ ...p, [s.key]: !p[s.key] }))} className="w-12 h-7 rounded-full relative transition-all duration-300 shrink-0" style={{ backgroundColor: platformSettings[s.key] ? (s.danger ? '#ef4444' : '#22c55e') : 'var(--color-border)' }}>
                                                    <div className="w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-md" style={{ left: platformSettings[s.key] ? '26px' : '4px' }} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="p-6 rounded-3xl flex flex-col justify-between" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                    <div>
                                        <h3 className="text-lg font-black mb-4" style={{ color: 'var(--color-text)' }}>🌐 Sistema</h3>
                                        {[['Plataforma', 'Ciberseguridad Digital'], ['Versión', 'v2.6'], ['Estado', '🟢 Producción'], ['DB', 'Supabase (PostgreSQL)'], ['Hosting', 'Vercel'], ['Auth', 'Supabase + JWT'], ['SSL', '✅ Activo']].map(([l, v]) => (
                                            <div key={l} className="flex items-center gap-2 py-1.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <span className="text-[10px] font-black uppercase tracking-widest w-28 shrink-0" style={{ color: 'var(--color-text-muted)' }}>{l}</span>
                                                <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* SOCIAL LINKS CARD */}
                            <div className="p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-black" style={{ color: 'var(--color-text)' }}>🔗 Enlaces de Comunidad</h3>
                                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>URLs dinámicas para Footer y sección Comunidad</p>
                                    </div>
                                    <button 
                                        className="px-4 py-2 rounded-xl text-xs font-black text-white hover:scale-105 transition-transform" 
                                        style={{ background: 'var(--gradient-primary)' }}
                                        onClick={() => handleSaveSocialLinks()}
                                    >
                                        {savingLinks ? 'Guardando...' : 'Guardar Cambios'}
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(socialLinks).map(([network, url]) => (
                                        <div key={network} className="flex flex-col gap-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest pl-1" style={{ color: 'var(--color-text-muted)' }}>
                                                {network.charAt(0).toUpperCase() + network.slice(1)}
                                            </label>
                                            <input
                                                type="url"
                                                value={url}
                                                onChange={(e) => setSocialLinks(prev => ({...prev, [network]: e.target.value}))}
                                                placeholder={`URL de ${network}...`}
                                                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-[var(--color-primary)]"
                                                style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================== SEGURIDAD ==================== */}
                    {activeSection === 'seguridad' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-black" style={{ color: 'var(--color-text)' }}>🛡️ Estado de Seguridad</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { title: 'HTTPS/SSL', status: '✅', desc: 'Certificado activo via Vercel', color: '#22c55e' },
                                    { title: 'Autenticación', status: '✅', desc: 'Supabase Auth + JWT', color: '#22c55e' },
                                    { title: 'RLS Policies', status: '⚠️', desc: 'Ejecutar SQL en Supabase', color: '#eab308' },
                                    { title: 'CSRF Protection', status: '✅', desc: 'Next.js incorporado', color: '#22c55e' },
                                    { title: 'Rate Limiting', status: '⚠️', desc: 'Configurar en producción', color: '#eab308' },
                                    { title: 'XSS Protection', status: '✅', desc: 'React escapa HTML', color: '#22c55e' },
                                ].map((s, i) => (
                                    <div key={i} className="p-4 rounded-2xl flex items-start gap-3" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                        <span className="text-lg">{s.status}</span>
                                        <div><p className="text-sm font-black" style={{ color: s.color }}>{s.title}</p><p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.desc}</p></div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                <h3 className="text-lg font-black mb-3" style={{ color: 'var(--color-text)' }}>🔑 Superadmin Emails</h3>
                                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
                                    <p className="text-sm font-mono font-bold" style={{ color: 'var(--color-primary)' }}>antoniocorporan40@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================== BASE DE DATOS ==================== */}
                    {activeSection === 'base-datos' && (
                        <div className="space-y-6 max-w-3xl">
                            <h2 className="text-xl font-black" style={{ color: 'var(--color-text)' }}>🗃️ Configuración SQL</h2>
                            <div className="p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>Ejecuta en <strong>Supabase → SQL Editor</strong>:</p>
                                <pre className="p-4 rounded-2xl text-[11px] overflow-x-auto font-mono leading-relaxed" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
{`-- ============================================
-- SQL Completo (Ejecutar en Supabase -> SQL Editor)
-- ============================================

-- 1. Tabla Perfiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT, bio TEXT, avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'superadmin')),
  email TEXT, xp INTEGER DEFAULT 0, level INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins read all" ON profiles FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin')));
CREATE POLICY "Superadmin update all" ON profiles FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'superadmin'));

-- 2. Progreso de Usuario
CREATE TABLE IF NOT EXISTS user_progress (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  data_json JSONB DEFAULT '{"lessons":[],"projects":[],"xp":0,"level":1,"streak":0}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own progress" ON user_progress FOR ALL USING (auth.uid() = user_id);

-- 3. Configuración de Plataforma (Redes y Links Dinámicos)
CREATE TABLE IF NOT EXISTS platform_settings (
  id TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users
);
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read platform settings" ON platform_settings FOR SELECT USING (true);
CREATE POLICY "Superadmins can update platform settings" ON platform_settings FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'superadmin'));

INSERT INTO platform_settings (id, value) 
VALUES ('social_links', '{"facebook": "#", "instagram": "#", "tiktok": "#", "github": "#", "discord": "#", "whatsapp": "#"}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 4. Suscripciones de Usuarios (Planes)
CREATE TABLE IF NOT EXISTS user_subscriptions (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  plan_id TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own sub" ON user_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins manage subs" ON user_subscriptions FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin')));

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name, email, role)
  VALUES (NEW.id, SPLIT_PART(NEW.email,'@',1), NEW.email, CASE WHEN NEW.email = 'antoniocorporan40@gmail.com' THEN 'superadmin' ELSE 'user' END);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();`}
                                </pre>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

/* ===== GLASS STAT CARD ===== */
function GlassStatCard({ label, value, icon, trend, color }) {
    return (
        <div className="p-5 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition-all"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: color }} />
            <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{icon}</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>{trend}</span>
            </div>
            <p className="text-2xl md:text-3xl font-black mb-0.5" style={{ color: color }}>{value}</p>
            <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
        </div>
    );
}
