import { useState, useEffect } from 'react';

export default function CVEFeed() {
    const [cves, setCves] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating NIST NVD API Fetch (for immediate functionality)
        const mockCVEs = [
            { id: 'CVE-2026-001', title: 'Critical RCE in Core Engine', severity: 'CRITICAL', date: 'Hoy' },
            { id: 'CVE-2026-002', title: 'SQL Injection in Legacy API', severity: 'HIGH', date: 'Ayer' },
            { id: 'CVE-2026-003', title: 'Information Disclosure in WebUI', severity: 'MEDIUM', date: 'hace 2 días' },
            { id: 'CVE-2026-004', title: 'Unauthorized Access in IoT Gateway', severity: 'HIGH', date: 'hace 3 días' }
        ];
        
        setTimeout(() => {
            setCves(mockCVEs);
            setLoading(false);
        }, 800);
    }, []);

    const getSeverityColor = (sev) => {
        if (sev === 'CRITICAL') return 'text-red-500 border-red-500/20 bg-red-500/10';
        if (sev === 'HIGH') return 'text-orange-500 border-orange-500/20 bg-orange-500/10';
        return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10';
    };

    return (
        <section id="noticias" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500 mb-4 block">
                            Alertas en Tiempo Real
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic">
                            Monitor de <span className="gradient-text">Vulnerabilidades</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 font-medium max-w-md">
                        Feed directo de la base de datos nacional de vulnerabilidades (NVD). Mantente actualizado con las últimas amenazas globales.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading ? (
                        [1,2,3,4].map(i => (
                            <div key={i} className="h-64 rounded-[40px] bg-white/5 animate-pulse border border-white/5"></div>
                        ))
                    ) : (
                        cves.map(cve => (
                            <div key={cve.id} className="group p-8 rounded-[40px] bg-graphite-900 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-2">
                                <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black tracking-widest border mb-6 ${getSeverityColor(cve.severity)}`}>
                                    {cve.severity}
                                </span>
                                <h3 className="text-sm font-black text-white mb-4 leading-tight">{cve.title}</h3>
                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{cve.id}</span>
                                    <span className="text-[10px] font-bold text-gray-500">{cve.date}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-12 text-center">
                    <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                        Ver Archivo Completo
                    </button>
                </div>
            </div>
        </section>
    );
}
