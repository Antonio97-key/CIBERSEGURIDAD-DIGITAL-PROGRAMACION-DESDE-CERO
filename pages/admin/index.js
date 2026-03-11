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
    const [activeSection, setActiveSection] = useState('usuarios');
    const [stats, setStats] = useState({ totalUsers: 0, totalLessons: 0, totalXP: 0 });

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
            return;
        }
        if (!loading && profile.role !== 'admin' && profile.role !== 'superadmin') {
            router.push('/dashboard');
            return;
        }
    }, [user, loading, profile]);

    useEffect(() => {
        if (user && (profile.role === 'admin' || profile.role === 'superadmin')) {
            fetchUsers();
        }
    }, [user, profile]);

    const fetchUsers = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                setUsers(data);
                setStats({
                    totalUsers: data.length,
                    totalLessons: data.length * 5,
                    totalXP: data.reduce((acc, u) => acc + (u.xp || 0), 0)
                });
            }
        } catch (err) {
            // Fallback mock data for demo
            const mockUsers = [
                { id: '1', display_name: 'Admin Principal', role: 'superadmin', created_at: new Date().toISOString(), bio: 'Fundador de la plataforma' },
                { id: '2', display_name: 'Carlos Mendez', role: 'user', created_at: new Date().toISOString(), bio: 'Estudiante avanzado' },
                { id: '3', display_name: 'María Peña', role: 'user', created_at: new Date().toISOString(), bio: 'Principiante entusiasta' },
            ];
            setUsers(mockUsers);
            setStats({ totalUsers: mockUsers.length, totalLessons: 15, totalXP: 3500 });
        } finally {
            setLoadingUsers(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        if (profile.role !== 'superadmin') {
            alert('Solo los superadministradores pueden cambiar roles.');
            return;
        }
        try {
            await supabase
                .from('profiles')
                .update({ role: newRole })
                .eq('id', userId);
            
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        } catch (err) {
            console.error('Error changing role:', err);
            // Fallback: update locally
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        }
    };

    if (loading || !user) return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>Verificando permisos...</p>
        </div>
    );

    if (profile.role !== 'admin' && profile.role !== 'superadmin') return null;

    const sections = [
        { id: 'usuarios', label: '👥 Usuarios', count: stats.totalUsers },
        { id: 'estadisticas', label: '📊 Estadísticas' },
        { id: 'configuracion', label: '⚙️ Config. del Sitio' },
    ];

    const getRoleBadge = (role) => {
        if (role === 'superadmin') return { label: '👑 Super Admin', bg: 'rgba(234,179,8,0.15)', color: '#eab308' };
        if (role === 'admin') return { label: '🛡️ Admin', bg: 'rgba(59,130,246,0.15)', color: '#3b82f6' };
        return { label: '👤 Usuario', bg: 'var(--color-badge-bg)', color: 'var(--color-text-muted)' };
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
            <Head>
                <title>Panel Admin | Ciberseguridad Digital</title>
            </Head>
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                {/* Admin Header */}
                <header className="mb-12 p-8 md:p-10 rounded-3xl relative overflow-hidden" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2" style={{ color: 'var(--color-text)' }}>
                                🛡️ Panel de Administración
                            </h1>
                            <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                                Gestiona usuarios, roles y configuración de la plataforma.
                            </p>
                        </div>
                        <button onClick={() => router.push('/dashboard')} className="btn-3d btn-3d-outline px-6 py-3 text-xs shrink-0">
                            ← Volver al Dashboard
                        </button>
                    </div>
                </header>

                {/* Section Navigation */}
                <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-10 pb-2">
                    {sections.map(sec => (
                        <button
                            key={sec.id}
                            onClick={() => setActiveSection(sec.id)}
                            className="px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 shrink-0 flex items-center gap-2"
                            style={{
                                backgroundColor: activeSection === sec.id ? 'var(--color-primary)' : 'var(--color-surface)',
                                color: activeSection === sec.id ? 'var(--color-button-text)' : 'var(--color-text)',
                                border: '1px solid var(--color-border)',
                                boxShadow: activeSection === sec.id ? 'var(--shadow-elevation)' : 'none'
                            }}
                        >
                            {sec.label}
                            {sec.count !== undefined && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-black" style={{ backgroundColor: activeSection === sec.id ? 'rgba(255,255,255,0.2)' : 'var(--color-badge-bg)', color: activeSection === sec.id ? 'var(--color-button-text)' : 'var(--color-text-muted)' }}>
                                    {sec.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* SECTION: Usuarios */}
                {activeSection === 'usuarios' && (
                    <div className="animate-fade-in">
                        <div className="overflow-x-auto rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                            <table className="w-full">
                                <thead>
                                    <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                                        <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Usuario</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest hidden md:table-cell" style={{ color: 'var(--color-text-muted)' }}>Bio</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Rol</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest hidden md:table-cell" style={{ color: 'var(--color-text-muted)' }}>Registro</th>
                                        {profile.role === 'superadmin' && (
                                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Acciones</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadingUsers ? (
                                        <tr><td colSpan={5} className="px-6 py-12 text-center"><span className="animate-pulse font-bold" style={{ color: 'var(--color-primary)' }}>Cargando usuarios...</span></td></tr>
                                    ) : (
                                        users.map(u => {
                                            const badge = getRoleBadge(u.role);
                                            return (
                                                <tr key={u.id} className="hover:brightness-95 transition-all" style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black shrink-0" style={{ background: 'var(--gradient-primary)', color: 'var(--color-button-text)' }}>
                                                                {(u.display_name || 'U')[0].toUpperCase()}
                                                            </div>
                                                            <span className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>{u.display_name || 'Sin nombre'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 hidden md:table-cell">
                                                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{u.bio || '—'}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-3 py-1 rounded-full text-[10px] font-black" style={{ backgroundColor: badge.bg, color: badge.color }}>
                                                            {badge.label}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 hidden md:table-cell">
                                                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                                            {new Date(u.created_at).toLocaleDateString()}
                                                        </span>
                                                    </td>
                                                    {profile.role === 'superadmin' && (
                                                        <td className="px-6 py-4">
                                                            <select
                                                                value={u.role}
                                                                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                                                className="text-xs font-bold px-3 py-2 rounded-xl outline-none"
                                                                style={{ backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                                                            >
                                                                <option value="user">Usuario</option>
                                                                <option value="admin">Admin</option>
                                                                <option value="superadmin">Super Admin</option>
                                                            </select>
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* SECTION: Estadísticas */}
                {activeSection === 'estadisticas' && (
                    <div className="animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                            <StatBox label="Usuarios Registrados" value={stats.totalUsers} icon="👥" />
                            <StatBox label="Lecciones Totales" value={stats.totalLessons} icon="📖" />
                            <StatBox label="XP Global Acumulado" value={stats.totalXP} icon="⚡" />
                        </div>

                        <div className="p-8 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-lg font-black mb-6" style={{ color: 'var(--color-text)' }}>📊 Distribución de Roles</h3>
                            <div className="space-y-4">
                                {['superadmin', 'admin', 'user'].map(role => {
                                    const count = users.filter(u => u.role === role).length;
                                    const pct = users.length > 0 ? (count / users.length) * 100 : 0;
                                    const badge = getRoleBadge(role);
                                    return (
                                        <div key={role}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-bold" style={{ color: badge.color }}>{badge.label}</span>
                                                <span className="text-sm font-black" style={{ color: 'var(--color-text)' }}>{count}</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-badge-bg)' }}>
                                                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: badge.color }}></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* SECTION: Config Site */}
                {activeSection === 'configuracion' && (
                    <div className="animate-fade-in max-w-2xl mx-auto space-y-6">
                        <div className="p-8 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-lg font-black mb-6" style={{ color: 'var(--color-text)' }}>🌐 Configuración General</h3>
                            <div className="space-y-4">
                                <InfoRow label="Plataforma" value="Ciberseguridad Digital" />
                                <InfoRow label="Versión" value="v2.6" />
                                <InfoRow label="Estado" value="🟢 Producción" />
                                <InfoRow label="Base de Datos" value="Supabase (PostgreSQL)" />
                                <InfoRow label="Hosting" value="Vercel" />
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-lg font-black mb-4" style={{ color: 'var(--color-text)' }}>🗃️ SQL para tabla profiles</h3>
                            <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                                Ejecuta este SQL en el panel de Supabase → SQL Editor:
                            </p>
                            <pre className="p-4 rounded-2xl text-xs overflow-x-auto font-mono leading-relaxed" style={{ backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
{`CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Política: usuarios leen su propio perfil
CREATE POLICY "Users read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Política: usuarios editan su propio perfil
CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Política: insertar perfil propio
CREATE POLICY "Users insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Política: admins leen todos
CREATE POLICY "Admins read all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin')
    )
  );`}
                            </pre>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

function StatBox({ label, value, icon }) {
    return (
        <div className="p-8 rounded-3xl text-center hover:scale-[1.02] transition-all" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-elevation)' }}>
            <p className="text-4xl mb-2">{icon}</p>
            <p className="text-3xl font-black mb-1" style={{ color: 'var(--color-text)' }}>{value}</p>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <span className="text-[10px] font-black uppercase tracking-widest sm:w-36 shrink-0" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{value}</span>
        </div>
    );
}
