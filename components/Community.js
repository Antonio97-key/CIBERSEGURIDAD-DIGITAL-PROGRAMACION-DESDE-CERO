import { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase';

export default function Community() {
    const { t } = useLanguage();
    const { user, profile } = useAuth();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dynamicLinks, setDynamicLinks] = useState({ telegram: '#', whatsapp: '#' });

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const { data } = await supabase.from('platform_settings').select('value').eq('id', 'social_links').single();
                if (data && data.value) {
                    setDynamicLinks({
                        telegram: data.value.telegram || '#',
                        whatsapp: data.value.whatsapp || '#'
                    });
                }
            } catch (e) { console.error("Error fetching community links:", e); }
        };
        const fetchComments = async () => {
            try {
                const { data, error } = await supabase.from('forum_posts').select('*').order('created_at', { ascending: false }).limit(20);
                if (data && data.length > 0) {
                    setComments(data);
                } else {
                    // Fallback to sample data if table is empty or missing
                    setComments([
                        { id: 1, text: '¡Excelente plataforma! Me ayudó mucho a entender la ciberseguridad.', author: 'Comunidad', created_at: new Date().toISOString() },
                    ]);
                }
            } catch (e) { console.error(e); }
        };
        fetchLinks();
        fetchComments();
    }, []);

    const addComment = async () => {
        if (!newComment.trim()) return;
        if (!user) {
            alert('Debes iniciar sesión para comentar.');
            return;
        }

        setIsSubmitting(true);

        const newPost = {
            text: newComment.trim(),
            author: profile?.display_name || user.email.split('@')[0],
            created_at: new Date().toISOString(),
            user_id: user.id
        };

        try {
            const { data, error } = await supabase.from('forum_posts').insert([newPost]).select();
            if (data && data[0]) {
                setComments([data[0], ...comments]);
            } else {
                setComments([{ ...newPost, id: Date.now() }, ...comments]);
            }
        } catch (e) {
            setComments([{ ...newPost, id: Date.now() }, ...comments]);
        }

        setNewComment('');
        setIsSubmitting(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addComment();
        }
    };

    return (
        <section id="comunidad" className="relative py-20">
            <div className="section-container">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="chip chip-green mb-4 inline-flex">💬 {t('community.badge')}</span>
                    <h2 className="section-title gradient-text">{t('community.title')}</h2>
                    <p className="section-subtitle mx-auto">
                        {t('community.subtitle')}
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* New Comment Form */}
                    <div className="glass-card p-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                A
                            </div>
                            <div className="flex-1">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Escribe un comentario..."
                                    className="input-modern resize-none min-h-[80px]"
                                    rows={3}
                                />
                                <div className="flex items-center justify-between mt-3">
                                    <p className="text-xs text-gray-400">
                                        Presiona Enter para enviar
                                    </p>
                                    <button
                                        onClick={addComment}
                                        disabled={!newComment.trim() || isSubmitting}
                                        className="btn-3d btn-3d-primary text-xs px-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                                Enviar
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="glass-card p-5 animate-slide-up">
                                <div className="flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-sm font-bold flex-shrink-0">
                                        {(comment.author || 'A')[0].toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {comment.author || 'Usuario'}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-300">
                                                {new Date(comment.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                                            {comment.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Communities Call to Action */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Telegram Community Call to Action */}
                        <div className="relative overflow-hidden rounded-2xl p-1 bg-gradient-to-r from-[#0088cc] to-[#005580] shadow-lg transform transition-transform hover:-translate-y-1">
                            <div className="bg-white dark:bg-carbon-900 rounded-xl p-6 flex flex-col items-center text-center gap-4 relative z-10 h-full">
                                <div className="flex-shrink-0 w-16 h-16 bg-[#0088cc]/10 dark:bg-[#0088cc]/20 rounded-full flex items-center justify-center">
                                    {/* Telegram Icon */}
                                    <svg className="w-8 h-8 text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z" />
                                    </svg>
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Comunidad Telegram</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex-1">
                                        Conecta con otros estudiantes, resuelve dudas en tiempo real y entérate de las últimas novedades.
                                    </p>
                                    <a
                                        href={dynamicLinks.telegram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-[#0088cc] hover:bg-[#0077b3] text-white font-semibold py-2 px-6 rounded-full transition-colors w-full"
                                    >
                                        Unirse al Grupo
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Community Call to Action */}
                        <div className="relative overflow-hidden rounded-2xl p-1 bg-gradient-to-r from-[#25D366] to-[#128C7E] shadow-lg transform transition-transform hover:-translate-y-1">
                            <div className="bg-white dark:bg-carbon-900 rounded-xl p-6 flex flex-col items-center text-center gap-4 relative z-10 h-full">
                                <div className="flex-shrink-0 w-16 h-16 bg-[#25D366]/10 dark:bg-[#25D366]/20 rounded-full flex items-center justify-center">
                                    {/* WhatsApp Icon */}
                                    <svg className="w-8 h-8 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.031 0C5.397 0 .012 5.385.012 12.019c0 2.12.553 4.195 1.603 6.014L.027 24l6.113-1.603c1.745.955 3.73 1.458 5.882 1.458 6.634 0 12.019-5.385 12.019-12.019S18.665 0 12.031 0zm6.593 17.376c-.28.788-1.571 1.503-2.181 1.562-.573.055-1.32-.084-3.525-.97-2.665-1.07-4.381-3.791-4.516-3.97-.134-.179-1.077-1.433-1.077-2.734 0-1.302.673-1.942.912-2.196.239-.254.522-.317.696-.317.174 0 .348.005.503.012.164.009.385-.06.602.463.224.538.766 1.871.836 2.015.07.144.114.312.025.49-.09.179-.134.288-.269.467-.134.179-.283.393-.403.527-.134.144-.275.298-.12.565.154.266.688 1.138 1.48 1.844 1.021.91 1.874 1.187 2.143 1.321.269.134.428.114.587-.06.159-.174.686-.801.871-1.074.184-.274.368-.229.617-.134.25.095 1.583.746 1.852.88.269.134.448.204.513.313.065.109.065.642-.215 1.43z" />
                                    </svg>
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Comunidad WhatsApp</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex-1">
                                        Únete a nuestro grupo de WhatsApp para discusiones rápidas, compartir recursos y mantenerte al día.
                                    </p>
                                    <a
                                        href={dynamicLinks.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-2 px-6 rounded-full transition-colors w-full"
                                    >
                                        Unirse al Grupo
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Info Note */}
                </div>
            </div>
        </section>
    );
}
