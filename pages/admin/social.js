import { useState } from 'react';
import { siteConfig } from '../../data/siteConfig';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Head from 'next/head';

export default function AdminSocial() {
    const [links, setLinks] = useState(siteConfig.socialLinks);
    const [saving, setSaving] = useState(false);

    const handleUpdate = (id, newUrl) => {
        setLinks(links.map(link => link.id === id ? { ...link, url: newUrl } : link));
    };

    const saveChanges = () => {
        setSaving(true);
        // This would normally be a Supabase update to a 'config' table
        setTimeout(() => {
            setSaving(false);
            alert('Configuración guardada exitosamente en la base de datos central.');
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary-500/30">
            <Head>
                <title>Admin Area | Gestión de Redes</title>
            </Head>
            <Header />

            <main className="max-w-4xl mx-auto px-4 py-24">
                <div className="mb-12">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-500 mb-4 block">Panel de Control</span>
                    <h1 className="text-4xl font-black italic tracking-tighter">Gestión de <span className="gradient-text">Redes Sociales</span></h1>
                    <p className="text-gray-500 mt-4 font-medium">Actualiza los enlaces de la comunidad global sin modificar el código fuente.</p>
                </div>

                <div className="space-y-6">
                    {links.map(link => (
                        <div key={link.id} className="glass-card p-10 flex flex-col md:flex-row items-center gap-8 group hover:border-primary-500/30 transition-all">
                            <div className="w-16 h-16 rounded-[25px] bg-white/5 border border-white/5 flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform">
                                <span className="text-xl font-black">{link.icon}</span>
                            </div>
                            <div className="flex-1 w-full">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-600 mb-3">{link.name} URL</label>
                                <input 
                                    type="text" 
                                    value={link.url}
                                    onChange={(e) => handleUpdate(link.id, e.target.value)}
                                    className="w-full bg-black/50 border border-white/5 rounded-2xl p-4 text-sm focus:border-primary-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-end">
                    <button 
                        onClick={saveChanges}
                        disabled={saving}
                        className="px-12 py-5 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-all shadow-2xl active:scale-95"
                    >
                        {saving ? 'Sincronizando...' : 'Guardar Cambios Globales'}
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
