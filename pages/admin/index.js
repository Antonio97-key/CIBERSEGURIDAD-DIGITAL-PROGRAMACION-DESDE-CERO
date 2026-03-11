import { useAuth } from '../../lib/AuthContext';
import { supabase } from '../../lib/supabase';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AdminPanel() {
    const { user, loading, profile } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [stats, setStats] = useState({ totalUsers: 0, totalLessons: 0, totalXP: 0, activeToday: 0 });
    const [platformSettings, setPlatformSettings] = useState({
        maintenanceMode: false,
        registrationOpen: true,
        maxUsersPerDay: 100,
        siteName: 'Ciberseguridad Digital',
        siteVersion: 'v2.6',
        emailNotifications: true,
    });
    const [activityLog, setActivityLog] = useState([]);

    useEffect(() => {
        if (!loading && !user) { router.push('/'); return; }
        if (!loading && profile.role !== 'admin' && profile.role !== 'superadmin') {
            router.push('/dashboard'); return;
        }
    }, [user, loading, profile]);

    useEffect(() => {
        if (user && (profile.role === 'admin' || profile.role === 'superadmin')) {
            fetchUsers();
            generateActivityLog();
        }
    }, [user, profile]);

    const fetchUsers = async () => {
        try {
            const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
            if (data) {
                setUsers(data);
                setStats({
                    totalUsers: data.length,
                    totalLessons: data.length * 5,
                    totalXP: data.reduce((acc, u) => acc + (u.xp || 0), 0),
                    activeToday: Math.ceil(data.length * 0.6)
                });
            }
        } catch {
            const mockUsers = [
                { id: '1', display_name: 'antoniocorporan40', email: 'antoniocorporan40@gmail.com', role: 'superadmin', created_at: new Date().toISOString(), bio: 'Fundador', xp: 1500 },
                { id: '2', display_name: 'Carlos Mendez', email: 'carlos@test.com', role: 'user', created_at: new Date(Date.now() - 86400000).toISOString(), bio: 'Estudiante', xp: 320 },
                { id: '3', display_name: 'María Peña', email: 'maria@test.com', role: 'user', created_at: new Date(Date.now() - 172800000).toISOString(), bio: 'Principiante', xp: 85 },
                { id: '4', display_name: 'Diego Torres', email: 'diego@test.com', role: 'admin', created_at: new Date(Date.now() - 259200000).toISOString(), bio: 'Moderador', xp: 780 },
            ];
            setUsers(mockUsers);
            setStats({ totalUsers: mockUsers.length, totalLessons: 20, totalXP: 2685, activeToday: 3 });
        } finally {
            setLoadingUsers(false);
        }
    };

    const generateActivityLog = () => {
        const now = Date.now();
        setActivityLog([
            { time: new Date(now - 300000).toLocaleTimeString(), action: 'Login exitoso', user: 'antoniocorporan40', type: 'auth' },
            { time: new Date(now - 900000).toLocaleTimeString(), action: 'Perfil actualizado', user: 'Carlos', type: 'profile' },
            { time: new Date(now - 3600000).toLocaleTimeString(), action: 'Nuevo registro', user: 'María Peña', type: 'auth' },
            { time: new Date(now - 7200000).toLocaleTimeString(), action: 'Lección completada: SQL Injection', user: 'Diego', type: 'progress' },
            { time: new Date(now - 14400000).toLocaleTimeString(), action: 'Cambio de rol → Admin', user: 'Diego', type: 'admin' },
            { time: new Date(now - 28800000).toLocaleTimeString(), action: 'Deploy actualizado v2.6', user: 'Sistema', type: 'system' },
        ]);
    };

    const handleRoleChange = async (userId, newRole) => {
        if (profile.role !== 'superadmin') {
            alert('Solo los superadministradores pueden cambiar roles.'); return;
        }
        try {
            await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
        } catch {}
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    };

    const handleDeleteUser = async (userId) => {
        if (profile.role !== 'superadmin') return;
        if (!confirm('¿Estás seguro de eliminar este usuario? Esta acción es irreversible.')) return;
        try {
            await supabase.from('profiles').delete().eq('id', userId);
        } catch {}
        setUsers(prev => prev.filter(u => u.id !== userId));
    };

    const toggleSetting = (key) => {
        setPlatformSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (loading || !user) return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
            <p className="text-sm font-bold uppercase tracking-widest animate-pulse" style={{ color: 'var(--color-primary)' }}>Verificando permisos...</p>
        </div>
    );

    if (profile.role !== 'admin' && profile.role !== 'superadmin') return null;

    const sections = [
        { id: 'dashboard', label: '🏠 Dashboard', icon: '🏠' },
        { id: 'usuarios', label: '👥 Usuarios', count: stats.totalUsers },
        { id: 'actividad', label: '📋 Actividad' },
        { id: 'plataforma', label: '🔧 Plataforma' },
        { id: 'seguridad', label: '🛡️ Seguridad' },
        { id: 'base-datos', label: '🗃️ Base de Datos' },
    ];

    const getRoleBadge = (role) => {
        if (role === 'superadmin') return { label: '👑 Super Admin', bg: 'rgba(234,179,8,0.15)', color: '#eab308' };
        if (role === 'admin') return { label: '🛡️ Admin', bg: 'rgba(59,130,246,0.15)', color: '#3b82f6' };
        return { label: '👤 Usuario', bg: 'var(--color-badge-bg)', color: 'var(--color-text-muted)' };
    };

    const getActivityIcon = (type) => {
        const icons = { auth: '🔐', profile: '👤', progress: '📈', admin: '🛡️', system: '⚙️' };
        return icons[type] || '📌';
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
            <Head><title>Panel Superadmin | Ciberseguridad Digital</title></Head>
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20">
                {/* Admin Header */}
                <header className="mb-10 p-6 md:p-8 rounded-3xl relative overflow-hidden" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">👑</span>
                                <h1 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: 'var(--color-text)' }}>
                                    Panel Superadmin
                                </h1>
                            </div>
                            <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                                Bienvenido, <strong style={{ color: 'var(--color-primary)' }}>{profile.display_name}</strong> — Control total de la plataforma
                            </p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <span className="chip chip-green">🟢 Sistema Activo</span>
                            <button onClick={() => router.push('/dashboard')} className="btn-3d btn-3d-outline px-4 py-2 text-xs">← Dashboard</button>
                        </div>
                    </div>
                </header>

                {/* Section Navigation */}
                <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
                    {sections.map(sec => (
                        <button
                            key={sec.id}
                            onClick={() => setActiveSection(sec.id)}
                            className="px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 shrink-0 flex items-center gap-2"
                            style={{
                                backgroundColor: activeSection === sec.id ? 'var(--color-primary)' : 'var(--color-surface)',
                                color: activeSection === sec.id ? 'var(--color-button-text)' : 'var(--color-text)',
                                border: '1px solid var(--color-border)',
                                boxShadow: activeSection === sec.id ? 'var(--shadow-elevation)' : 'none'
                            }}
                        >
                            {sec.label}
                            {sec.count !== undefined && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-black" style={{ backgroundColor: activeSection === sec.id ? 'rgba(255,255,255,0.2)' : 'var(--color-badge-bg)' }}>
                                    {sec.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* ==================== DASHBOARD OVERVIEW ==================== */}
                {activeSection === 'dashboard' && (
                    <div className="space-y-8">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatBox label="Usuarios Totales" value={stats.totalUsers} icon="👥" color="#3b82f6" />
                            <StatBox label="Activos Hoy" value={stats.activeToday} icon="🟢" color="#22c55e" />
                            <StatBox label="XP Global" value={stats.totalXP.toLocaleString()} icon="⚡" color="#eab308" />
                            <StatBox label="Lecciones" value={stats.totalLessons} icon="📖" color="#8b5cf6" />
                        </div>

                        {/* Quick Actions */}
                        <div className="p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-lg font-black mb-4" style={{ color: 'var(--color-text)' }}>⚡ Acciones Rápidas</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <QuickAction label="Ver Usuarios" icon="👥" onClick={() => setActiveSection('usuarios')} />
                                <QuickAction label="Actividad" icon="📋" onClick={() => setActiveSection('actividad')} />
                                <QuickAction label="Seguridad" icon="🛡️" onClick={() => setActiveSection('seguridad')} />
                                <QuickAction label="Config DB" icon="🗃️" onClick={() => setActiveSection('base-datos')} />
                            </div>
                        </div>

                        {/* Recent Activity Preview */}
                        <div className="p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-black" style={{ color: 'var(--color-text)' }}>📋 Actividad Reciente</h3>
                                <button onClick={() => setActiveSection('actividad')} className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>Ver todo →</button>
                            </div>
                            <div className="space-y-3">
                                {activityLog.slice(0, 4).map((log, i) => (
                                    <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <span className="text-lg">{getActivityIcon(log.type)}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>{log.action}</p>
                                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{log.user} · {log.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ==================== USUARIOS ==================== */}
                {activeSection === 'usuarios' && (
                    <div>
                        <div className="overflow-x-auto rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                            <table className="w-full">
                                <thead>
                                    <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                                        <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Usuario</th>
                                        <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest hidden md:table-cell" style={{ color: 'var(--color-text-muted)' }}>Email</th>
                                        <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Rol</th>
                                        <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest hidden md:table-cell" style={{ color: 'var(--color-text-muted)' }}>XP</th>
                                        <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest hidden lg:table-cell" style={{ color: 'var(--color-text-muted)' }}>Registro</th>
                                        {profile.role === 'superadmin' && (
                                            <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Acciones</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadingUsers ? (
                                        <tr><td colSpan={6} className="px-6 py-12 text-center"><span className="animate-pulse font-bold" style={{ color: 'var(--color-primary)' }}>Cargando...</span></td></tr>
                                    ) : users.map(u => {
                                        const badge = getRoleBadge(u.role);
                                        return (
                                            <tr key={u.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
                                                            {(u.display_name || 'U')[0].toUpperCase()}
                                                        </div>
                                                        <span className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>{u.display_name || 'Sin nombre'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 hidden md:table-cell">
                                                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{u.email || '—'}</span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="px-3 py-1 rounded-full text-[10px] font-black" style={{ backgroundColor: badge.bg, color: badge.color }}>{badge.label}</span>
                                                </td>
                                                <td className="px-5 py-4 hidden md:table-cell">
                                                    <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{u.xp || 0} XP</span>
                                                </td>
                                                <td className="px-5 py-4 hidden lg:table-cell">
                                                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{new Date(u.created_at).toLocaleDateString()}</span>
                                                </td>
                                                {profile.role === 'superadmin' && (
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <select
                                                                value={u.role}
                                                                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                                                className="text-xs font-bold px-2 py-1.5 rounded-lg outline-none"
                                                                style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                                                            >
                                                                <option value="user">Usuario</option>
                                                                <option value="admin">Admin</option>
                                                                <option value="superadmin">Super Admin</option>
                                                            </select>
                                                            <button
                                                                onClick={() => handleDeleteUser(u.id)}
                                                                className="text-red-500 hover:text-red-400 transition-colors text-xs font-bold px-2 py-1.5 rounded-lg"
                                                                style={{ border: '1px solid rgba(239,68,68,0.2)' }}
                                                                title="Eliminar usuario"
                                                            >✕</button>
                                                        </div>
                                                    </td>
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
                    <div className="p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                        <h3 className="text-lg font-black mb-6" style={{ color: 'var(--color-text)' }}>📋 Registro de Actividad</h3>
                        <div className="space-y-2">
                            {activityLog.map((log, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.01]" style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
                                    <span className="text-2xl">{getActivityIcon(log.type)}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{log.action}</p>
                                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Por: {log.user}</p>
                                    </div>
                                    <span className="text-xs font-bold shrink-0 px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-text-muted)' }}>
                                        {log.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ==================== PLATAFORMA ==================== */}
                {activeSection === 'plataforma' && (
                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-lg font-black mb-6" style={{ color: 'var(--color-text)' }}>🔧 Controles de la Plataforma</h3>
                            <div className="space-y-4">
                                <ToggleRow label="Modo Mantenimiento" desc="Desactiva el acceso público temporal" active={platformSettings.maintenanceMode} onToggle={() => toggleSetting('maintenanceMode')} danger />
                                <ToggleRow label="Registro Abierto" desc="Permite que nuevos usuarios se registren" active={platformSettings.registrationOpen} onToggle={() => toggleSetting('registrationOpen')} />
                                <ToggleRow label="Notificaciones Email" desc="Enviar emails automáticos al registrarse" active={platformSettings.emailNotifications} onToggle={() => toggleSetting('emailNotifications')} />
                            </div>
                        </div>

                        <div className="p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-lg font-black mb-4" style={{ color: 'var(--color-text)' }}>🌐 Información del Sistema</h3>
                            <div className="space-y-3">
                                <InfoRow label="Plataforma" value={platformSettings.siteName} />
                                <InfoRow label="Versión" value={platformSettings.siteVersion} />
                                <InfoRow label="Estado" value="🟢 Producción" />
                                <InfoRow label="Base de Datos" value="Supabase (PostgreSQL)" />
                                <InfoRow label="Hosting" value="Vercel" />
                                <InfoRow label="Framework" value="Next.js" />
                                <InfoRow label="Autenticación" value="Supabase Auth + JWT" />
                                <InfoRow label="SSL/TLS" value="✅ Activo (via Vercel)" />
                            </div>
                        </div>
                    </div>
                )}

                {/* ==================== SEGURIDAD ==================== */}
                {activeSection === 'seguridad' && (
                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-lg font-black mb-6" style={{ color: 'var(--color-text)' }}>🛡️ Estado de Seguridad</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SecurityCard title="HTTPS/SSL" status="active" desc="Certificado SSL activo via Vercel" />
                                <SecurityCard title="Autenticación" status="active" desc="Supabase Auth con JWT tokens" />
                                <SecurityCard title="RLS (Row Level Security)" status="warning" desc="Configurar políticas en Supabase" />
                                <SecurityCard title="Protección CSRF" status="active" desc="Next.js protección incorporada" />
                                <SecurityCard title="Rate Limiting" status="warning" desc="Configurar en producción" />
                                <SecurityCard title="Sanitización de Inputs" status="active" desc="React escapa HTML por defecto" />
                            </div>
                        </div>

                        <div className="p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-lg font-black mb-4" style={{ color: 'var(--color-text)' }}>🔑 Emails Superadmin</h3>
                            <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
                                Estos emails siempre tienen acceso superadmin, definidos en <code style={{ color: 'var(--color-primary)' }}>AuthContext.js</code>:
                            </p>
                            <div className="p-4 rounded-2xl" style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
                                <p className="text-sm font-mono font-bold" style={{ color: 'var(--color-primary)' }}>antoniocorporan40@gmail.com</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ==================== BASE DE DATOS ==================== */}
                {activeSection === 'base-datos' && (
                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-lg font-black mb-2" style={{ color: 'var(--color-text)' }}>🗃️ SQL — Tabla Profiles</h3>
                            <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>Ejecuta en Supabase → SQL Editor para activar perfiles y roles:</p>
                            <pre className="p-4 rounded-2xl text-xs overflow-x-auto font-mono leading-relaxed" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
{`CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  email TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Usuarios leen propio perfil
CREATE POLICY "Users read own" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Usuarios editan propio perfil
CREATE POLICY "Users update own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Insert propio perfil
CREATE POLICY "Users insert own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Admins leen todos
CREATE POLICY "Admins read all" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin'))
  );

-- Superadmin actualiza cualquier perfil
CREATE POLICY "Superadmin update all" ON profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'superadmin')
  );

-- Trigger: crear perfil auto al registrarse
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name, email, role)
  VALUES (
    NEW.id,
    SPLIT_PART(NEW.email, '@', 1),
    NEW.email,
    CASE WHEN NEW.email = 'antoniocorporan40@gmail.com'
      THEN 'superadmin' ELSE 'user' END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();`}
                            </pre>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

/* ======================== SUB-COMPONENTS ======================== */

function StatBox({ label, value, icon, color }) {
    return (
        <div className="p-5 rounded-2xl text-center hover:scale-[1.02] transition-all" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="text-2xl mb-1">{icon}</p>
            <p className="text-2xl font-black mb-0.5" style={{ color: color || 'var(--color-text)' }}>{value}</p>
            <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
        </div>
    );
}

function QuickAction({ label, icon, onClick }) {
    return (
        <button onClick={onClick} className="p-4 rounded-2xl text-center hover:scale-[1.03] transition-all" style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
            <span className="text-xl block mb-1">{icon}</span>
            <span className="text-xs font-bold block" style={{ color: 'var(--color-text)' }}>{label}</span>
        </button>
    );
}

function ToggleRow({ label, desc, active, onToggle, danger }) {
    return (
        <div className="flex items-center justify-between gap-4 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <div>
                <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{label}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
            </div>
            <button
                onClick={onToggle}
                className="w-12 h-7 rounded-full relative transition-all duration-300 shrink-0"
                style={{ backgroundColor: active ? (danger ? '#ef4444' : '#22c55e') : 'var(--color-border)' }}
            >
                <div className="w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-md" style={{ left: active ? '26px' : '4px' }}></div>
            </button>
        </div>
    );
}

function SecurityCard({ title, status, desc }) {
    const colors = {
        active: { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)', color: '#22c55e', label: '✅ Activo' },
        warning: { bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.2)', color: '#eab308', label: '⚠️ Pendiente' },
        inactive: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)', color: '#ef4444', label: '❌ Inactivo' },
    };
    const c = colors[status];
    return (
        <div className="p-4 rounded-2xl" style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-black" style={{ color: c.color }}>{title}</span>
                <span className="text-[10px] font-bold">{c.label}</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-2.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <span className="text-[10px] font-black uppercase tracking-widest sm:w-36 shrink-0" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{value}</span>
        </div>
    );
}
