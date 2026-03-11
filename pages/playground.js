import Head from 'next/head';
import CodePlayground from '../components/CodePlayground';
import { useState } from 'react';

export default function PlaygroundPage() {
    const [lang, setLang] = useState('javascript');

    const examples = {
        javascript: `// ¡Bienvenido al Playground de JS!
const saludo = "Hola, Hacker";
const anio = 2026;

console.log(\`\${saludo}. Bienvenido al futuro (\${anio}).\`);

function testSecurity() {
    const system = { status: "SECURE", firewall: "ACTIVE" };
    return system;
}

console.log("Estado del sistema:", testSecurity());`,
        python: `# ¡Bienvenido al Playground de Python!
# Ejecutándose localmente vía Pyodide

def greet_hacker(name):
    print(f"Hola, {name}. Iniciando entorno Python 3.11...")

greet_hacker("Antonio97")

import math
print(f"Cálculo complejo: math.sqrt(256) = {math.sqrt(256)}")

for i in range(3):
    print(f"Escaneando puerto {80 + i}...")
`
    };

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-6">
            <Head>
                <title>Code Playground | Ciberseguridad Digital</title>
            </Head>

            <div className="max-w-6xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-4 py-1 rounded-full bg-primary-500 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary-500/20">
                                Laboratorio Virtual
                            </span>
                            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Entorno Seguro (Sandbox)
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
                            CODE <span className="gradient-text">PLAYGROUND</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed">
                            Experimenta con código en tiempo real sin instalar nada. Prueba tus scripts de seguridad, automatiza tareas o simplemente aprende practicando.
                        </p>
                    </div>

                    <div className="flex bg-graphite-900 border border-white/5 p-1 rounded-2xl shadow-2xl">
                        <button 
                            onClick={() => setLang('javascript')}
                            className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${lang === 'javascript' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-gray-500 hover:text-white'}`}
                        >
                            JavaScript
                        </button>
                        <button 
                            onClick={() => setLang('python')}
                            className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${lang === 'python' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-gray-500 hover:text-white'}`}
                        >
                            Python
                        </button>
                    </div>
                </header>

                <CodePlayground 
                    language={lang} 
                    initialCode={examples[lang]} 
                    key={lang}
                    title={lang === 'javascript' ? 'Entorno de Desarrollo JS' : 'Entorno de Ejecución Python'}
                />

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-[32px] bg-white/5 border border-white/5 group hover:bg-white/[0.08] transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-black text-white mb-3">Velocidad Extrema</h4>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">Ejecución instantánea en el cliente. Tu código se compila y corre directamente en el navegador.</p>
                    </div>

                    <div className="p-8 rounded-[32px] bg-white/5 border border-white/5 group hover:bg-white/[0.08] transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04 Peligro" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-black text-white mb-3">Privacidad Total</h4>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">No hay servidores intermedios. Tu código permanece en tu sesión local y nunca se guarda en la nube.</p>
                    </div>

                    <div className="p-8 rounded-[32px] bg-white/5 border border-white/5 group hover:bg-white/[0.08] transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.722 2.387a2 2 0 001.076 2.373l2.422 1.211a2 2 0 001.96 0l2.422-1.211a2 2 0 001.076-2.373l-.722-2.387a2 2 0 00-1.022-.547z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14h4m-4 0a4 4 0 108 0 4 4 0 00-8 0z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-black text-white mb-3">Multi-Lenguaje</h4>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">Alterna entre JavaScript para web y Python para hacking ético con un solo clic.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
