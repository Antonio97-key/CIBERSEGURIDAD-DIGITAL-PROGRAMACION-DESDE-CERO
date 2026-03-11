import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { useLanguage } from '../lib/LanguageContext';

export default function Forum() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPosts();
        
        // Subscribe to real-time changes
        const subscription = supabase
            .channel('public:forum_posts')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'forum_posts' }, (payload) => {
                setPosts(prev => [payload.new, ...prev]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('forum_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (err) {
            console.error('Error fetching forum:', err);
            // Fallback to mock if table doesn't exist yet
            setPosts([
                { id: 1, content: '¿Cuál es la mejor distro para empezar en Pentesting?', author_email: 'hacker@example.com', created_at: new Date().toISOString() },
                { id: 2, content: 'Acabo de terminar el laboratorio de SQLi, ¡muy recomendado!', author_email: 'student@cyber.edu', created_at: new Date().toISOString() }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async () => {
        if (!newPost.trim() || !user) return;
        setSubmitting(true);

        try {
            const { error } = await supabase
                .from('forum_posts')
                .insert([{ 
                    content: newPost.trim(),
                    author_id: user.id,
                    author_email: user.email
                }]);

            if (error) throw error;
            setNewPost('');
        } catch (err) {
            console.error('Error sending post:', err);
            // Fallback for demo
            const mockPost = {
                id: Date.now(),
                content: newPost.trim(),
                author_email: user.email,
                created_at: new Date().toISOString()
            };
            setPosts([mockPost, ...posts]);
            setNewPost('');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="comunidad" className="py-24 relative">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-sm font-black uppercase tracking-[0.3em] text-primary-500 mb-4 block">Folio Hacker</span>
                    <h2 className="section-title gradient-text mb-6">
                        Red de Inteligencia
                    </h2>
                    <p className="text-xl font-medium max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                        Comparte hallazgos, resuelve dudas y colabora con otros defensores en tiempo real.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto glass-card p-8 mb-16 shadow-lg border-primary-500/20">
                    {!user ? (
                        <div className="text-center py-8">
                            <p className="text-lg font-bold mb-8" style={{ color: 'var(--color-text-muted)' }}>
                                Inicia sesión para participar en la comunidad
                            </p>
                            <div className="flex justify-center gap-4">
                                <button 
                                    onClick={() => window.dispatchEvent(new Event('openAuthModal'))}
                                    className="btn-3d btn-3d-primary px-8 py-3 text-sm"
                                >
                                    Iniciar Sesión
                                </button>
                                <button 
                                    onClick={() => window.dispatchEvent(new Event('openAuthModal'))}
                                    className="btn-3d btn-3d-secondary px-8 py-3 text-sm"
                                >
                                    Unirse a la Comunidad
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <textarea
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                placeholder="Comparte algo con la comunidad..."
                                className="w-full bg-black/40 border border-white/5 rounded-3xl p-6 text-sm focus:border-primary-500 outline-none transition-all resize-none min-h-[120px]"
                            />
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Autor: {user.email}</span>
                                <button 
                                    onClick={handleSend}
                                    disabled={submitting || !newPost.trim()}
                                    className="px-10 py-3 rounded-xl bg-primary-500 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary-400 transition-all disabled:opacity-50"
                                >
                                    {submitting ? 'Transmitiendo...' : 'Publicar Hallazgo'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6 max-w-3xl mx-auto">
                    {loading ? (
                        <div className="text-center py-12 text-primary-500 animate-pulse font-black uppercase tracking-widest">Sincronizando Feed...</div>
                    ) : (
                        posts.map(post => (
                            <div key={post.id} className="p-8 rounded-[32px] glass-card hover:border-primary-500/50 transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex flex-col items-center text-center mb-6">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-black text-xl mb-3 shadow-md border-2 border-white/10">
                                        {post.author_email[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                                            {post.author_email.split('@')[0]}
                                        </p>
                                        <p className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-muted)' }}>
                                            {new Date(post.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-black/20 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                                    <p className="text-center text-base leading-relaxed font-medium" style={{ color: 'var(--color-text)' }}>
                                        {post.content}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-20 text-center">
                    <h3 className="text-2xl font-black mb-8 tracking-tight" style={{ color: 'var(--color-text)' }}>
                        Comunidad Externa Integrada
                    </h3>
                    <div className="flex justify-center gap-6 flex-wrap">
                        <a href="https://t.me/+tualtoenlace" target="_blank" rel="noopener noreferrer" className="btn-3d px-8 py-4 text-sm flex items-center gap-3 shadow-lg" style={{ background: '#0088cc', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                            </svg>
                            Grupo de Telegram
                        </a>
                        <a href="https://chat.whatsapp.com/tuenlace" target="_blank" rel="noopener noreferrer" className="btn-3d px-8 py-4 text-sm flex items-center gap-3 shadow-lg" style={{ background: '#25D366', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Grupo de WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
