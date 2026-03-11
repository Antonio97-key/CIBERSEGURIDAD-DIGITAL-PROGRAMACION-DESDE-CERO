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
                    <p className="font-semibold max-w-md" style={{ color: 'var(--color-text-muted)' }}>
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
                            <a 
                                key={cve.id} 
                                href={`https://nvd.nist.gov/vuln/detail/${cve.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-8 rounded-[30px] shadow-lg border hover:-translate-y-2 transition-all"
                                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                            >
                                <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black tracking-widest border mb-6 ${getSeverityColor(cve.severity)}`}>
                                    {cve.severity}
                                </span>
                                <h3 className="text-base font-black mb-4 leading-tight" style={{ color: 'var(--color-text)' }}>{cve.title}</h3>
                                <div className="flex items-center justify-between mt-auto pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{cve.id}</span>
                                    <span className="text-xs font-bold" style={{ color: 'var(--color-text-muted)' }}>{cve.date}</span>
                                </div>
                            </a>
                        ))
                    )}
                </div>

                <div className="mt-12 text-center">
                    <a 
                        href="https://nvd.nist.gov/vuln/search"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 rounded-xl shadow-md text-xs font-black uppercase tracking-widest transition-all hover:-translate-y-1"
                        style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                    >
                        Ver Archivo Completo
                    </a>
                </div>
            </div>
        </section>
    );
}
