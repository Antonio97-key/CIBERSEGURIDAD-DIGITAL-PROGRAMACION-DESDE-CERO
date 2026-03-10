import { useState, useEffect } from 'react';

export default function PolicyModal({ isOpen, onClose, policy }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div 
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div 
                className={`relative w-full max-w-2xl bg-graphite-900 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden transition-all duration-500 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
            >
                {/* Decorative bar */}
                <div className="h-2 w-full bg-gradient-to-r from-primary-500 to-purple-600"></div>

                <div className="p-8 sm:p-12">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500 mb-2 block">Documento Legal</span>
                            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter">{policy?.title}</h2>
                        </div>
                        <button 
                            onClick={onClose}
                            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all hover:rotate-90"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                        {policy?.content.map((paragraph, index) => (
                            <p key={index} className="text-gray-400 text-lg leading-relaxed font-medium">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" />
                                </svg>
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-gray-500">Versión 2026.1 Actualizada</span>
                        </div>
                        <button 
                            onClick={onClose}
                            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-primary-500 text-white font-black text-xs uppercase tracking-widest hover:bg-primary-400 transition-all shadow-xl shadow-primary-500/20 active:scale-95"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
