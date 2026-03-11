import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useLanguage } from '../lib/LanguageContext';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CyberSection from '../components/CyberSection';
import SyntaxTable from '../components/SyntaxTable';
import IntegrationProjects from '../components/IntegrationProjects';
import TrustSection from '../components/TrustSection';
import TestimonialsSlider from '../components/TestimonialsSlider';
import Resources from '../components/Resources';
import Community from '../components/Community';
import NewsSection from '../components/NewsSection';
import CVEFeed from '../components/CVEFeed';
import Footer from '../components/Footer';
import Pricing from '../components/Pricing';

export default function Home() {
    const { t } = useLanguage();
    const [userLevel, setUserLevel] = useState('beginner');

    useEffect(() => {
        const savedLevel = Cookies.get('userLevel');
        if (savedLevel) setUserLevel(savedLevel);
    }, []);

    const handleLevelChange = (level) => {
        Cookies.set('userLevel', level, { expires: 30 });
        setUserLevel(level);
    };

    return (
        <>
            <Header />

            <main>
                <HeroSection />

                {/* Level Selector */}
                <div className="section-alt">
                    <div className="section-container py-8">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                                {t('levelSelector.question')}
                            </p>
                            <div className="inline-flex rounded-2xl p-1.5" style={{ backgroundColor: 'var(--color-surface-hover)' }}>
                                <button
                                    onClick={() => handleLevelChange('beginner')}
                                    className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                                    style={{
                                        backgroundColor: userLevel === 'beginner' ? 'var(--color-surface)' : 'transparent',
                                        color: userLevel === 'beginner' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                        boxShadow: userLevel === 'beginner' ? 'var(--shadow-elevation)' : 'none',
                                    }}
                                >
                                    🌱 {t('levelSelector.beginner')}
                                </button>
                                <button
                                    onClick={() => handleLevelChange('advanced')}
                                    className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                                    style={{
                                        backgroundColor: userLevel === 'advanced' ? 'var(--color-surface)' : 'transparent',
                                        color: userLevel === 'advanced' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                        boxShadow: userLevel === 'advanced' ? 'var(--shadow-elevation)' : 'none',
                                    }}
                                >
                                    🚀 {t('levelSelector.advanced')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <CyberSection level={userLevel} />
                <SyntaxTable />
                <IntegrationProjects level={userLevel} />
                <TrustSection />
                <Pricing />
                <TestimonialsSlider />
                <NewsSection />
                <Resources />
                <CVEFeed />
                <Community />
            </main>

            <Footer />
        </>
    );
}
