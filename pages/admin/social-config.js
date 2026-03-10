import { useState } from 'react';
import { siteConfig } from '../../data/siteConfig';
import Head from 'next/head';

export default function AdminSocialConfig() {
    const [links, setLinks] = useState(siteConfig.socialLinks);
    const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, success

    const handleUrlChange = (id, newUrl) => {
        setLinks(links.map(link => link.id === id ? { ...link, url: newUrl } : link));
    };

    const handleSave = () => {
        setSaveStatus('saving');
        // Simulación de guardado en base de datos (Supabase)
        setTimeout(() => {
            setSaveStatus('success');
            setTimeout(() => setSaveStatus('idle'), 2000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 sm:p-12">
            <Head>
                <title>Admin | Configuración de Redes</title>
            </Head>

            <div className="max-w-4xl mx-auto">
                <header className="mb-12 border-b border-white/5 pb-8 flex justify-between items-end">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500 mb-2 block">Panel de Control</span>
                        <h1 className="text-4xl font-black tracking-tighter">Gestión de <span className="gradient-text">Redes Sociales</span></h1>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Admin Autenticado
                    </div>
                </header>

                <div className="grid gap-6">
                    {links.map((link) => (
                        <div key={link.id} className="bg-graphite-900 border border-white/5 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 transition-all hover:border-primary-500/30">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 text-xl font-black text-gray-400">
                                {link.icon}
                            </div>
                            <div className="flex-grow w-full">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">
                                    Enlace de {link.name}
                                </label>
                                <input 
                                    type="text" 
                                    value={link.url}
                                    onChange={(e) => handleUrlChange(link.id, e.target.value)}
                                    className="w-full bg-black/50 border border-white/5 rounded-xl px-6 py-3 text-sm font-medium focus:border-primary-500 outline-none transition-all"
                                    placeholder={`https://.../${link.id}`}
                                />
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest h-fit">
                                Activo
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-end items-center gap-6">
                    {saveStatus === 'success' && (
                        <span className="text-green-500 text-xs font-black uppercase tracking-widest animate-bounce">
                            ¡Configuración Actualizada!
                        </span>
                    )}
                    <button 
                        onClick={handleSave}
                        disabled={saveStatus === 'saving'}
                        className={`px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-primary-500/20 active:scale-95 flex items-center gap-3 ${saveStatus === 'saving' ? 'bg-gray-800 text-gray-500' : 'bg-primary-500 text-white hover:bg-primary-400'}`}
                    >
                        {saveStatus === 'saving' ? (
                            <>
                                <div className="w-4 h-4 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
                                Guardando...
                            </>
                        ) : (
                            'Guardar Cambios'
                        )}
                    </button>
                </div>

                <div className="mt-20 p-8 rounded-[40px] bg-primary-500/5 border border-white/5">
                    <h4 className="text-lg font-black text-white mb-4">Nota de Administrador</h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                        Cualquier cambio realizado aquí se reflejará instantáneamente en el Footer de toda la plataforma. 
                        Asegúrese de utilizar enlaces HTTPS válidos para mantener la seguridad de los usuarios.
                    </p>
                </div>
            </div>
        </div>
    );
}
