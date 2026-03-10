import { useState } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../../lib/LanguageContext';
import { siteConfig } from '../../data/siteConfig';

export default function SocialAdmin() {
    const { t } = useLanguage();
    const router = useRouter();
    const [links, setLinks] = useState(siteConfig.socialLinks);
    const [status, setStatus] = useState('');

    const handleUpdate = (id, newUrl) => {
        setLinks(links.map(link => link.id === id ? { ...link, url: newUrl } : link));
    };

    const saveChanges = () => {
        setStatus('Guardando...');
        // In a real app, this would be an API call to update a database or JSON file
        setTimeout(() => {
            console.log('Nuevos enlaces para siteConfig:', links);
            setStatus('Cambios guardados localmente (Para persistencia real, actualiza data/siteConfig.js)');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-graphite-950 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12">
                    <button onClick={() => router.back()} className="text-primary-400 mb-4 hover:underline">← Volver</button>
                    <h1 className="text-4xl font-black tracking-tighter uppercase">Panel de Gestión Social</h1>
                    <p className="text-gray-400 font-medium">Modifica los enlaces de redes sociales que aparecen en el footer.</p>
                </header>

                <div className="grid gap-6">
                    {links.map((link) => (
                        <div key={link.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-2xl font-black">
                                {link.icon}
                            </div>
                            <div className="flex-1 w-full">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-primary-500 mb-2">
                                    {link.name} (ID: {link.id})
                                </label>
                                <input 
                                    type="text" 
                                    value={link.url}
                                    onChange={(e) => handleUpdate(link.id, e.target.value)}
                                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:border-primary-500 transition-all"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex items-center justify-between gap-6">
                    <p className="text-xs font-bold text-green-500">{status}</p>
                    <button 
                        onClick={saveChanges}
                        className="px-10 py-4 rounded-2xl bg-primary-500 text-white font-black text-xs uppercase tracking-widest hover:bg-primary-400 transition-all shadow-xl shadow-primary-500/20 active:scale-95"
                    >
                        Guardar Configuración
                    </button>
                </div>

                <div className="mt-20 p-8 bg-primary-500/10 border border-primary-500/20 rounded-3xl">
                    <h3 className="text-primary-400 font-black uppercase tracking-widest text-sm mb-4">Nota de Implementación</h3>
                    <p className="text-gray-400 font-medium leading-relaxed">
                        Este panel está preparado para interactuar con una API. Actualmente, los cambios se reflejan en el estado local. Para aplicar los cambios de forma permanente en esta versión estática, edita manualmente el archivo <code className="bg-white/10 px-2 py-1 rounded">data/siteConfig.js</code>. En la versión de producción, esto estará sincronizado con Supabase.
                    </p>
                </div>
            </div>
        </div>
    );
}
