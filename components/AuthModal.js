import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

export default function AuthModal({ isOpen, onClose }) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState(null);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

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
                alert('¡Registro exitoso! Revisa tu email para confirmar.');
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                onClose();
                router.push('/dashboard');
                return;
            }
            onClose();
        } catch (err) {
            let msg = err.message;
            if (msg.includes('Invalid login credentials')) {
                msg = 'Credenciales de acceso inválidas. Verifica tu email y clave.';
            } else if (msg.includes('User already registered')) {
                msg = 'Este usuario ya está registrado.';
            } else if (msg.includes('Password should be at least')) {
                msg = 'La clave debe tener al menos 6 caracteres.';
            }
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
            
            <div className="relative w-full max-w-md bg-graphite-900 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden p-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-500/20">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tighter">
                        {isSignUp ? 'Únete a la Élite' : 'Acceso Autorizado'}
                    </h2>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-2">
                        {isSignUp ? 'Crea tu perfil de seguridad' : 'Ingresa a tu terminal'}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Email Corporativo</label>
                        <input 
                            type="email" 
                            required 
                            className="w-full bg-black/50 text-white border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none focus:border-primary-500 transition-all font-medium"
                            placeholder="hacker@defensa.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Clave de Encriptación</label>
                        <input 
                            type="password" 
                            required 
                            className="w-full bg-black/50 text-white border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none focus:border-primary-500 transition-all font-medium"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">{error}</p>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-5 rounded-2xl bg-primary-500 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-primary-400 transition-all shadow-xl shadow-primary-500/20 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Procesando...' : (isSignUp ? 'Registrarme' : 'Entrar')}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button 
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                    >
                        {isSignUp ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
                    </button>
                </div>
            </div>
        </div>
    );
}
