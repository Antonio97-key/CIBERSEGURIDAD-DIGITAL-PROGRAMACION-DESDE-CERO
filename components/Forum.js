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
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-green-500 mb-4 block">Red de Inteligencia</span>
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-6">
                        Foro <span className="gradient-text">Hacker</span>
                    </h2>
                    <p className="text-gray-500 font-medium max-w-xl mx-auto">
                        Comparte hallazgos, resuelve dudas y colabora con otros defensores en tiempo real.
                    </p>
                </div>

                <div className="glass-card p-10 mb-12 border-primary-500/20 shadow-[0_0_50px_rgba(59,130,246,0.05)]">
                    {!user ? (
                        <div className="text-center py-6">
                            <p className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest">Inicia sesión para participar en la comunidad</p>
                            <button className="px-8 py-3 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-all">
                                Identificarse
                            </button>
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

                <div className="space-y-6">
                    {loading ? (
                        <div className="text-center py-12 text-primary-500 animate-pulse font-black uppercase tracking-widest">Sincronizando Feed...</div>
                    ) : (
                        posts.map(post => (
                            <div key={post.id} className="p-8 rounded-[40px] bg-graphite-900/50 border border-white/5 hover:border-white/10 transition-all">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-black text-xs">
                                        {post.author_email[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-white">{post.author_email}</p>
                                        <p className="text-[9px] font-bold text-gray-600 uppercase tracking-tighter">
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-300 leading-relaxed font-medium">{post.content}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
