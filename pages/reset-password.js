import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function ResetPassword() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Supabase will automatically handle the token from the URL hash
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'PASSWORD_RECOVERY') {
                // User arrived via reset link - show the form
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    const handleReset = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;
            setSuccess(true);
            setTimeout(() => router.push('/dashboard'), 3000);
        } catch (err) {
            setError(err.message || 'Error al actualizar la contraseña.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--color-background)' }}>
            <Head>
                <title>Restablecer Contraseña | Ciberseguridad Digital</title>
            </Head>

            <div className="w-full max-w-md p-8 md:p-10 rounded-3xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-5 shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--color-text)' }}>
                        {success ? '¡Contraseña Actualizada!' : 'Nueva Contraseña'}
                    </h1>
                    <p className="text-xs font-bold uppercase tracking-widest mt-2" style={{ color: 'var(--color-text-muted)' }}>
                        {success ? 'Redirigiendo al dashboard...' : 'Ingresa tu nueva contraseña segura'}
                    </p>
                </div>

                {success ? (
                    <div className="text-center">
                        <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                            <p className="text-green-500 text-sm font-bold">✅ Tu contraseña ha sido actualizada exitosamente.</p>
                        </div>
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>Serás redirigido al dashboard en 3 segundos...</p>
                    </div>
                ) : (
                    <form onSubmit={handleReset} className="space-y-5">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest mb-2 block" style={{ color: 'var(--color-text-muted)' }}>Nueva Contraseña</label>
                            <div className="relative group">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    className="w-full rounded-2xl px-5 py-4 text-sm outline-none transition-all font-medium pr-12"
                                    style={{ backgroundColor: 'var(--color-input-bg, var(--color-background))', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                                    placeholder="Mínimo 6 caracteres"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest mb-2 block" style={{ color: 'var(--color-text-muted)' }}>Confirmar Contraseña</label>
                            <div className="relative group">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    className="w-full rounded-2xl px-5 py-4 text-sm outline-none transition-all font-medium pr-12"
                                    style={{ backgroundColor: 'var(--color-input-bg, var(--color-background))', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                                    placeholder="Repite la contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                                <p className="text-red-500 text-xs font-bold text-center">{error}</p>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn-3d btn-3d-primary w-full py-4 text-xs"
                        >
                            {loading ? 'Actualizando...' : '🔑 Establecer Nueva Contraseña'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
