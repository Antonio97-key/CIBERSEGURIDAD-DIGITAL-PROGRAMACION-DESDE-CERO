import { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';

export default function NewsSection() {
    const { t, language } = useLanguage();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fallbackContent = t('news.fallback');
        const applyFallback = () => {
            if (Array.isArray(fallbackContent) && fallbackContent.length >= 10) {
                setNews(
                    fallbackContent.slice(0, 10).map((item, idx) => ({
                        id: `fallback-${idx}`,
                        title: item.title,
                        paragraphs: [item.p1, item.p2, item.p3],
                        url: '#',
                        readable_publish_date: new Date().toLocaleDateString(language, { month: 'short', day: 'numeric' }),
                        reading_time_minutes: 5 + idx,
                        user: { name: 'Admin Team' }
                    }))
                );
            }
        };

        const fetchNews = async () => {
            try {
                const tag = language === 'es' ? 'seguridad' : 'security';
                const response = await fetch(`https://dev.to/api/articles?tag=${tag}&per_page=10`);
                const basicData = await response.json();

                if (basicData && basicData.length > 0) {
                    // Fetch full article details to get paragraphs
                    const fullArticles = await Promise.all(
                        basicData.map(async (article) => {
                            try {
                                const detailResponse = await fetch(`https://dev.to/api/articles/${article.id}`);
                                const detailData = await detailResponse.json();

                                // Extract first 3 paragraphs from body_html
                                let paragraphs = [];
                                if (detailData.body_html) {
                                    // simple regex to find <p> tags and their content
                                    const pRegex = /<p[^>]*>(.*?)<\/p>/gs;
                                    let match;
                                    while ((match = pRegex.exec(detailData.body_html)) !== null && paragraphs.length < 3) {
                                        // Remove nested html tags and clean up text
                                        const cleanText = match[1].replace(/<[^>]+>/g, '').trim();
                                        if (cleanText.length > 50) { // Only keep substantial paragraphs
                                            paragraphs.push(cleanText);
                                        }
                                    }
                                }

                                // Fallback if no paragraphs found
                                if (paragraphs.length === 0) {
                                    paragraphs = [detailData.description];
                                }

                                return {
                                    ...article,
                                    paragraphs
                                };
                            } catch (e) {
                                return { ...article, paragraphs: [article.description] };
                            }
                        })
                    );
                    setNews(fullArticles);
                } else {
                    applyFallback();
                }
            } catch (error) {
                console.error("Failed to fetch news:", error);
                applyFallback();
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [language, t]);

    return (
        <section id="noticias" className="relative py-20 section-alt">
            <div className="section-container">
                <div className="text-center mb-16">
                    <span className="chip chip-blue mb-4 inline-flex">📰 {t('news.badge') || 'Actualidad'}</span>
                    <h2 className="section-title gradient-text">{t('news.title') || 'Noticias y Tendencias'}</h2>
                    <p className="section-subtitle mx-auto">
                        {t('news.subtitle') || 'Mantente al día con lo último en ciberseguridad y tecnología. Información actualizada en tiempo real para no salir de la plataforma.'}
                    </p>
                </div>

                {/* Slider Container */}
                <div className="relative overflow-hidden news-marquee-container">
                    <div className="flex gap-6 animate-marquee news-track">
                        {loading ? (
                            // Skeleton Loader
                            [1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="glass-card p-6 min-w-[350px] min-h-[300px] animate-pulse">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                                    <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                                </div>
                            ))
                        ) : (
                            // Double list for seamless infinite scroll
                            [...news, ...news].map((article, idx) => (
                                <div
                                    key={`${article.id}-${idx}`}
                                    className="glass-card flex flex-col p-6 min-w-[350px] max-w-[350px] group transition-all"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--color-primary)' }}>
                                            {article.readable_publish_date}
                                        </span>
                                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                            ⏱ {article.reading_time_minutes} min
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold mb-4 leading-tight group-hover:text-primary-500 transition-colors" style={{ color: 'var(--color-text)' }}>
                                        {article.title}
                                    </h3>

                                    <div className="text-xs flex-1 leading-relaxed mb-6 space-y-2 overflow-hidden line-clamp-6" style={{ color: 'var(--color-text-muted)' }}>
                                        {article.paragraphs?.map((p, pIdx) => (
                                            <p key={pIdx}>{p}</p>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 mt-auto" style={{ borderTop: '1px solid var(--color-border)' }}>
                                        <span className="text-[10px] font-medium" style={{ color: 'var(--color-text)' }}>
                                            By {article.user.name}
                                        </span>
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold text-[10px] flex items-center gap-1"
                                            style={{ color: 'var(--color-primary)' }}
                                        >
                                            {t('news.read_more') || 'Leer'}
                                            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
