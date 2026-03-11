import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

export default function AuthModal({ isOpen, onClose }) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMsg(null);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({ 
                    email, 
                    password,
                    options: {
                        emailRedirectTo: window.location.origin
                    }
                });
                if (error) throw error;
                setSuccessMsg('¡Registro exitoso! Revisa tu email para confirmar.');
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                onClose();
                router.push('/dashboard');
                return;
            }
        } catch (err) {
            let msg = err.message;
            if (msg.includes('Invalid login credentials')) {
                msg = 'Credenciales inválidas. Verifica tu email y contraseña.';
            } else if (msg.includes('User already registered')) {
                msg = 'Este usuario ya está registrado.';
            } else if (msg.includes('Password should be at least')) {
                msg = 'La contraseña debe tener al menos 6 caracteres.';
            } else if (msg.includes('Email not confirmed')) {
                msg = 'Tu email no está confirmado. Revisa tu bandeja de entrada.';
            }
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Ingresa tu email primero.');
            return;
        }
        setLoading(true);
        setError(null);
        setSuccessMsg(null);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`
            });
            if (error) throw error;
            setSuccessMsg('📧 ¡Enlace de recuperación enviado! Revisa tu bandeja de entrada (y spam).');
        } catch (err) {
            setError(err.message || 'Error al enviar el correo de recuperación.');
        } finally {
            setLoading(false);
        }
    };

    const resetState = () => {
        setError(null);
        setSuccessMsg(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
            
            <div className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-8 md:p-10" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 dark:bg-primary-500/10 flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(59,130,246,0.2)] border border-blue-500/20">
                        <svg className="w-8 h-8 text-blue-500 dark:text-primary-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={isForgotPassword 
                                ? "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                : "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            } />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--color-text)' }}>
                        {isForgotPassword ? 'Recuperar Acceso' : isSignUp ? 'Únete a la Élite' : 'Acceso Autorizado'}
                    </h2>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-2" style={{ color: 'var(--color-text-muted)' }}>
                        {isForgotPassword ? 'Te enviaremos un enlace de recuperación' : isSignUp ? 'Crea tu perfil de seguridad' : 'Ingresa a tu terminal'}
                    </p>
                </div>

                {/* Forgot Password Form */}
                {isForgotPassword ? (
                    <form onSubmit={handleForgotPassword} className="space-y-5">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest mb-2 block" style={{ color: 'var(--color-text-muted)' }}>Email de tu cuenta</label>
                            <input 
                                type="email" 
                                required 
                                className="w-full rounded-2xl px-5 py-4 text-sm outline-none transition-all font-medium"
                                style={{ backgroundColor: 'var(--color-input-bg, var(--color-background))', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                                placeholder="tucorreo@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                                <p className="text-red-500 text-xs font-bold text-center">{error}</p>
                            </div>
                        )}

                        {successMsg && (
                            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                                <p className="text-green-500 text-xs font-bold text-center">{successMsg}</p>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn-3d btn-3d-primary w-full py-4 text-xs"
                        >
                            {loading ? 'Enviando...' : '📧 Enviar Enlace de Recuperación'}
                        </button>

                        <div className="text-center pt-2">
                            <button 
                                type="button"
                                onClick={() => { setIsForgotPassword(false); resetState(); }}
                                className="text-[10px] font-black uppercase tracking-widest hover:opacity-70 transition-opacity"
                                style={{ color: 'var(--color-primary)' }}
                            >
                                ← Volver al inicio de sesión
                            </button>
                        </div>
                    </form>
                ) : (
                    /* Login / Signup Form */
                    <form onSubmit={handleAuth} className="space-y-5">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest mb-2 block" style={{ color: 'var(--color-text-muted)' }}>Email</label>
                            <input 
                                type="email" 
                                required 
                                className="w-full rounded-2xl px-5 py-4 text-sm outline-none transition-all font-medium"
                                style={{ backgroundColor: 'var(--color-input-bg, var(--color-background))', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                                placeholder="tucorreo@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <label className="text-[10px] font-black uppercase tracking-widest mb-2 block" style={{ color: 'var(--color-text-muted)' }}>Contraseña</label>
                            <div className="relative group">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    required 
                                    className="w-full rounded-2xl px-5 py-4 text-sm outline-none transition-all font-medium pr-12"
                                    style={{ backgroundColor: 'var(--color-input-bg, var(--color-background))', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors"
                                    title={showPassword ? "Ocultar Contraseña" : "Ver Contraseña"}
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

                        {/* Forgot Password Link */}
                        {!isSignUp && (
                            <div className="text-right">
                                <button 
                                    type="button"
                                    onClick={() => { setIsForgotPassword(true); resetState(); }}
                                    className="text-[10px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
                                    style={{ color: 'var(--color-primary)' }}
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>
                        )}

                        {error && (
                            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                                <p className="text-red-500 text-xs font-bold text-center">{error}</p>
                            </div>
                        )}

                        {successMsg && (
                            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                                <p className="text-green-500 text-xs font-bold text-center">{successMsg}</p>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn-3d btn-3d-primary w-full py-4 text-xs"
                        >
                            {loading ? 'Procesando...' : (isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión')}
                        </button>
                    </form>
                )}

                {/* Toggle Login/Signup */}
                {!isForgotPassword && (
                    <div className="mt-6 text-center">
                        <button 
                            onClick={() => { setIsSignUp(!isSignUp); resetState(); }}
                            className="text-[10px] font-black uppercase tracking-widest hover:opacity-70 transition-opacity"
                            style={{ color: 'var(--color-text-muted)' }}
                        >
                            {isSignUp ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
