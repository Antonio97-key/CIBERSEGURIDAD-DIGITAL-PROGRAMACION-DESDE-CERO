import { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { Highlight, themes } from 'prism-react-renderer';

const difficultyColors = {
    'Principiante': 'chip-green',
    'Intermedio': 'chip-orange',
    'Avanzado': 'chip-purple',
};

export default function IntegrationProjects({ level }) {
    const { t } = useLanguage();
    const [activeProject, setActiveProject] = useState(null);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

    const projects = [
        {
            id: 1,
            title: t('projects_data.port_scanner.title') || 'Detector de URLs Sospechosas',
            description: t('projects_data.port_scanner.desc') || 'Crea un script que analiza URLs para detectar posibles intentos de phishing verificando patrones comunes.',
            difficulty: t('projects.level.beginner') || 'Principiante',
            tech: ['Python', 'Regex'],
            icon: '🔍',
            code: `# Detector simple de URLs sospechosas
import re

def analizar_url(url):
    """Analiza una URL en busca de señales de phishing"""
    señales = []
    
    # Verificar IP en lugar de dominio
    if re.search(r'\\d+\\.\\d+\\.\\d+\\.\\d+', url):
        señales.append("⚠️ Contiene dirección IP")
    
    # Verificar caracteres sospechosos
    if '@' in url:
        señales.append("⚠️ Contiene @ (redirección)")
    
    # Verificar palabras comunes de phishing
    palabras = ['login', 'verify', 'update', 'secure', 'account']
    for palabra in palabras:
        if palabra in url.lower():
            señales.append(f"⚠️ Contiene '{palabra}'")
    
    # Verificar HTTPS
    if not url.startswith('https'):
        señales.append("⚠️ No usa HTTPS")
    
    if señales:
        print(f"\\n🚨 URL SOSPECHOSA: {url}")
        for s in señales:
            print(f"  {s}")
    else:
        print(f"\\n✅ URL parece segura: {url}")

# Prueba
analizar_url("https://banco-seguro.com/login")
analizar_url("http://192.168.1.1/verify@user")`,
        },
        {
            id: 2,
            title: t('projects_data.pass_validator.title') || 'Generador de Contraseñas Seguras',
            description: t('projects_data.pass_validator.desc') || 'Genera contraseñas fuertes con criterios de seguridad personalizables.',
            difficulty: t('projects.level.beginner') || 'Principiante',
            tech: ['JavaScript'],
            icon: '🔑',
            code: `// Generador de contraseñas seguras
function generarPassword(longitud = 16) {
  const chars = {
    mayusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    minusculas: 'abcdefghijklmnopqrstuvwxyz',
    numeros: '0123456789',
    especiales: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };
  
  const todos = Object.values(chars).join('');
  let password = '';
  
  // Asegurar al menos uno de cada tipo
  for (const tipo of Object.values(chars)) {
    const idx = Math.floor(Math.random() * tipo.length);
    password += tipo[idx];
  }
  
  // Completar con caracteres aleatorios
  for (let i = password.length; i < longitud; i++) {
    const idx = Math.floor(Math.random() * todos.length);
    password += todos[idx];
  }
  
  // Mezclar
  password = password.split('')
    .sort(() => Math.random() - 0.5)
    .join('');
  
  console.log("🔑 Contraseña generada:");
  console.log(password);
  console.log("\\n📊 Análisis:");
  console.log("  Longitud: " + password.length);
  console.log("  Fortaleza: " + (longitud >= 16 ? "Fuerte ✅" : "Media ⚠️"));
}

generarPassword(20);`,
        },
        {
            id: 3,
            title: t('projects_data.ip_calculator.title') || 'Analizador de Encabezados HTTP',
            description: t('projects_data.ip_calculator.desc') || 'Verifica la seguridad de un sitio web analizando sus encabezados de respuesta HTTP.',
            difficulty: t('projects.level.intermediate') || 'Intermedio',
            tech: ['Python', 'HTTP'],
            icon: '🌐',
            code: `# Analizador de seguridad de encabezados HTTP
# En producción, usa: import requests

def analizar_headers(headers):
    """Analiza encabezados HTTP por seguridad"""
    verificaciones = {
        'X-Content-Type-Options': {
            'esperado': 'nosniff',
            'riesgo': 'MIME sniffing attack'
        },
        'X-Frame-Options': {
            'esperado': 'DENY',
            'riesgo': 'Clickjacking attack'
        },
        'X-XSS-Protection': {
            'esperado': '1; mode=block',
            'riesgo': 'Cross-Site Scripting'
        },
        'Strict-Transport-Security': {
            'esperado': 'max-age=',
            'riesgo': 'Downgrade attack'
        }
    }
    
    print("🔍 Análisis de Seguridad HTTP\\n")
    score = 0
    total = len(verificaciones)
    
    for header, info in verificaciones.items():
        valor = headers.get(header)
        if valor and info['esperado'] in valor:
            print(f"  ✅ {header}: {valor}")
            score += 1
        elif valor:
            print(f"  ⚠️ {header}: {valor} (no óptimo)")
        else:
            print(f"  ❌ {header}: FALTANTE")
            print(f"     Riesgo: {info['riesgo']}")
    
    print(f"\\n📊 Score: {score}/{total}")
    
# Ejemplo de uso
headers_ejemplo = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
}
analizar_headers(headers_ejemplo)`,
        },
        {
            id: 4,
            title: t('projects_data.log_analyzer.title') || 'Cifrador de Mensajes',
            description: t('projects_data.log_analyzer.desc') || 'Implementa un cifrado César para entender los fundamentos de la criptografía de forma práctica.',
            difficulty: t('projects.level.intermediate') || 'Intermedio',
            tech: ['JavaScript', 'Criptografía'],
            icon: '🔐',
            code: `// Cifrado César - Fundamentos de Criptografía
function cifrarCesar(texto, desplazamiento) {
  return texto.split('').map(char => {
    const code = char.charCodeAt(0);
    
    // Mayúsculas (A-Z)
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(
        ((code - 65 + desplazamiento) % 26) + 65
      );
    }
    // Minúsculas (a-z)
    if (code >= 97 && code <= 122) {
      return String.fromCharCode(
        ((code - 97 + desplazamiento) % 26) + 97
      );
    }
    return char; // No modificar otros caracteres
  }).join('');
}

function descifrarCesar(texto, desplazamiento) {
  return cifrarCesar(texto, 26 - desplazamiento);
}

// Ejemplo
const mensaje = "Hola Mundo Seguro";
const clave = 7;

const cifrado = cifrarCesar(mensaje, clave);
const descifrado = descifrarCesar(cifrado, clave);

console.log("📝 Original:   " + mensaje);
console.log("🔒 Cifrado:    " + cifrado);
console.log("🔓 Descifrado: " + descifrado);
console.log("✅ Correcto:   " + (mensaje === descifrado));`,
        },
    ];

    return (
        <section id="integracion" className="relative py-20 section-alt">
            <div className="section-container">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="chip chip-green mb-4 inline-flex">🚀 {t('projects.badge')}</span>
                    <h2 className="section-title gradient-text">{t('projects.title')}</h2>
                    <p className="section-subtitle mx-auto text-balance">
                        {t('projects.subtitle')}
                    </p>
                </div>

                {/* Project Selector (Mobile Friendly & Desktop Sidebar) */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar gap-3 w-full lg:w-64 shrink-0">
                        {projects.map((p, idx) => (
                            <button
                                key={p.id}
                                onClick={() => setSelectedProjectIndex(idx)}
                                className={`px-6 py-4 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all duration-300 whitespace-nowrap lg:text-left flex items-center justify-center lg:justify-start gap-4 ${selectedProjectIndex === idx ? 'gradient-bg text-white shadow-xl scale-105 lg:scale-100 lg:translate-x-2' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)] opacity-70 hover:opacity-100 shadow-sm'}`}
                            >
                                <span className="text-xl">{p.icon}</span>
                                <span className="hidden lg:inline truncate">{p.title}</span>
                                <span className="lg:hidden">{p.title.split(' ').slice(0, 2).join(' ')}</span>
                            </button>
                        ))}
                    </div>

                    {/* Project Focus (Unified View) */}
                    <div className="flex-1 min-w-0 w-full px-0 lg:px-4">
                        {projects[selectedProjectIndex] && (
                            <div key={projects[selectedProjectIndex].id} className="glass-card overflow-hidden group animate-fade-in border-primary-500/10 h-full">
                                <div className="p-6 md:p-12">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-10">
                                        <div className="w-20 h-20 rounded-3xl bg-primary-500/5 dark:bg-primary-900/20 flex items-center justify-center text-5xl shadow-inner border border-primary-500/10">
                                            {projects[selectedProjectIndex].icon}
                                        </div>
                                        <div className="flex gap-2">
                                            <span className={`chip ${projects[selectedProjectIndex].difficulty.includes(t('projects.level.beginner') || 'Principiante') ? 'chip-green' : projects[selectedProjectIndex].difficulty.includes(t('projects.level.advanced') || 'Avanzado') ? 'chip-purple' : 'chip-orange'} text-[11px] font-black uppercase tracking-[0.2em] px-5 py-2`}>
                                                {projects[selectedProjectIndex].difficulty}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-6 tracking-tight text-balance leading-[1.1]">
                                        {projects[selectedProjectIndex].title}
                                    </h3>
                                    <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 mb-10 leading-relaxed opacity-90 max-w-3xl">
                                        {projects[selectedProjectIndex].description}
                                    </p>

                                    {/* Tech Tags */}
                                    <div className="flex flex-wrap gap-3 mb-12">
                                        {projects[selectedProjectIndex].tech.map((tag) => (
                                            <span key={tag} className="text-[11px] font-black uppercase tracking-widest px-6 py-2.5 rounded-2xl transition-all shadow-md" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Toggle Code */}
                                    <button
                                        onClick={() => setActiveProject(activeProject === projects[selectedProjectIndex].id ? null : projects[selectedProjectIndex].id)}
                                        className="btn-3d btn-3d-primary text-[10px] font-black uppercase tracking-[0.3em] w-full py-6 flex items-center justify-center gap-4 active:scale-95 transition-all shadow-2xl"
                                    >
                                        {activeProject === projects[selectedProjectIndex].id ? 'Ocultar Código' : 'Analizar Implementación'}
                                        <svg className={`w-5 h-5 transition-transform duration-500 ${activeProject === projects[selectedProjectIndex].id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Code Block */}
                                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${activeProject === projects[selectedProjectIndex].id ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="border-t border-[var(--color-border)] shadow-inner">
                                        <Highlight 
                                            theme={themes.nightOwl} 
                                            code={projects[selectedProjectIndex].code} 
                                            language={projects[selectedProjectIndex].tech.includes('Python') ? 'python' : 'javascript'}
                                        >
                                            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                                <pre className={`text-[14px] font-medium p-8 md:p-12 overflow-x-auto font-mono leading-loose ${className}`} style={{ ...style, margin: 0 }}>
                                                    {tokens.map((line, i) => (
                                                        <div key={i} {...getLineProps({ line })}>
                                                            <span className="opacity-20 mr-6 select-none inline-block w-6 text-right">{i + 1}</span>
                                                            {line.map((token, key) => (
                                                                <span key={key} {...getTokenProps({ token })} />
                                                            ))}
                                                        </div>
                                                    ))}
                                                </pre>
                                            )}
                                        </Highlight>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}
