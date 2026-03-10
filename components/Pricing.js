import { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from '../lib/AuthContext';

export default function Pricing() {
    const { t } = useLanguage();
    const { user, updateProgress } = useAuth();
    const [buying, setBuying] = useState(null);

    const handlePaymentSuccess = async (planId) => {
        if (!user) return;
        // Update user status in Supabase
        await updateProgress({ 
            subscription: planId,
            plan_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        });
        alert(`¡Gracias! Tu plan ${planId.toUpperCase()} ha sido activado. Ya tienes acceso total a los laboratorios.`);
    };

    const plans = [
// ... (rest of plans)
        {
            id: 'free',
            name: t('pricing.free.name') || 'Gratis',
            price: '$0',
            period: t('pricing.period.forever') || 'para siempre',
            features: [
                t('pricing.free.feat1') || 'Acceso completo a todos los niveles básicos',
                t('pricing.free.feat2') || 'Editor de código interactivo limitado',
                t('pricing.free.feat3') || 'Proyectos de integración introductorios',
                t('pricing.free.feat4') || 'Acceso a la comunidad y foro'
            ],
            badge: null,
            buttonText: t('pricing.free.btn') || 'Plan Actual',
            buttonClass: 'btn-3d-outline cursor-default',
            isPremium: false
        },
        {
            id: 'premium',
            name: t('pricing.premium.name') || 'Premium',
            price: '$12',
            period: t('pricing.period.monthly') || '/ mes',
            features: [
                t('pricing.premium.feat1') || 'Librería completa de vulnerabilidades',
                t('pricing.premium.feat2') || 'Laboratorios interactivos avanzados (OWASP)',
                t('pricing.premium.feat3') || 'Proyectos reales con feedback automatizado',
                t('pricing.premium.feat4') || 'Soporte prioritario 24/7 en Discord'
            ],
            badge: t('pricing.badge_recommended') || 'Más Popular',
            buttonText: t('pricing.premium.btn') || 'Mejorar a Premium',
            buttonClass: 'btn-3d-primary',
            isPremium: true
        },
        {
            id: 'vip',
            name: t('pricing.vip.name') || 'VIP Hacker',
            price: '$29',
            period: t('pricing.period.monthly') || '/ mes',
            features: [
                t('pricing.vip.feat1') || 'Todo lo incluido en el plan Premium',
                t('pricing.vip.feat2') || 'Mentoría 1 a 1 semanal',
                t('pricing.vip.feat3') || 'Preparación para certificaciones oficiales',
                t('pricing.vip.feat4') || 'Acceso anticipado a nuevo contenido'
            ],
            badge: null,
            buttonText: t('pricing.vip.btn') || 'Obtener VIP',
            buttonClass: 'btn-3d-secondary',
            isPremium: true
        }
    ];

    return (
        <section id="planes" className="relative py-20">
            <div className="section-container">
                <div className="text-center mb-16 px-4">
                    <span className="chip chip-purple mb-4 inline-flex">💎 {t('pricing.badge') || 'Planes'}</span>
                    <h2 className="section-title gradient-text">{t('pricing.title') || 'Invierte en tu Futuro'}</h2>
                    <p className="section-subtitle mx-auto">
                        {t('pricing.subtitle') || 'Acceso exclusivo a laboratorios de élite y certificaciones profesionales de ciberseguridad.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                    {plans.map((plan) => (
                        <div key={plan.id} className={`glass-card relative flex flex-col p-8 ${plan.isPremium && plan.badge ? 'border-primary-400 transform -translate-y-2 shadow-2xl z-10' : ''}`}>
                            {plan.badge && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-[11px] font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-lg">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8 mt-2">
                                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>{plan.name}</h3>
                                <div className="flex items-end justify-center gap-1">
                                    <span className="text-4xl font-extrabold gradient-text">{plan.price}</span>
                                    <span className="text-sm pb-1" style={{ color: 'var(--color-text-muted)' }}>{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.isPremium ? 'text-green-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {plan.id === 'free' ? (
                                <button className={`btn-3d w-full ${plan.buttonClass}`}>
                                    {plan.buttonText}
                                </button>
                            ) : (
                                <div className="mt-4">
                                    <PayPalButtons
                                        style={{ layout: "vertical", shape: "pill", label: "pay" }}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: plan.price.replace('$', '').replace('/m', '').replace('/u', ''),
                                                        },
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then((details) => {
                                                handlePaymentSuccess(plan.id);
                                            });
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
