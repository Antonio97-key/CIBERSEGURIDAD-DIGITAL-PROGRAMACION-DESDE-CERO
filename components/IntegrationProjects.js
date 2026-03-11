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

    const projects = [
        {
            id: 1,
            title: t('projects.p1.title') || 'Detector de URLs Sospechosas',
            description: t('projects.p1.desc') || 'Crea un script que analiza URLs para detectar posibles intentos de phishing verificando patrones comunes.',
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
            title: t('projects.p2.title') || 'Generador de Contraseñas Seguras',
            description: t('projects.p2.desc') || 'Genera contraseñas fuertes con criterios de seguridad personalizables.',
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
            title: t('projects.p3.title') || 'Analizador de Encabezados HTTP',
            description: t('projects.p3.desc') || 'Verifica la seguridad de un sitio web analizando sus encabezados de respuesta HTTP.',
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
            title: t('projects.p4.title') || 'Cifrador de Mensajes',
            description: t('projects.p4.desc') || 'Implementa un cifrado César para entender los fundamentos de la criptografía de forma práctica.',
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
                    <p className="section-subtitle mx-auto">
                        {t('projects.subtitle')}
                    </p>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="glass-card overflow-hidden group">
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-2xl">
                                        {project.icon}
                                    </div>
                                    <div className="flex gap-2 flex-wrap justify-end">
                                        <span className={`chip ${project.difficulty.includes(t('projects.level.beginner') || 'Principiante') ? 'chip-green' : project.difficulty.includes(t('projects.level.advanced') || 'Avanzado') ? 'chip-purple' : 'chip-orange'} text-xs font-bold`}>
                                            {project.difficulty}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3">
                                    {project.title}
                                </h3>
                                <p className="text-base font-medium text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t) => (
                                        <span key={t} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-graphite-700 text-gray-700 dark:text-gray-200 shadow-sm">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Toggle Code */}
                                <button
                                    onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                                    className="btn-3d btn-3d-outline text-sm font-bold w-full py-3"
                                >
                                    {activeProject === project.id ? t('projects.view_code') : t('projects.view_code')}
                                    <svg className={`w-5 h-5 transition-transform duration-300 ${activeProject === project.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Code Block */}
                            <div className={`transition-all duration-500 overflow-hidden ${activeProject === project.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="border-t border-gray-100 dark:border-gray-700/50">
                                    <Highlight 
                                        theme={themes.nightOwl} 
                                        code={project.code} 
                                        language={project.tech.includes('Python') ? 'python' : 'javascript'}
                                    >
                                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                            <pre className={`text-sm font-medium p-5 overflow-x-auto font-mono leading-relaxed ${className}`} style={{ ...style, margin: 0 }}>
                                                {tokens.map((line, i) => (
                                                    <div key={i} {...getLineProps({ line })}>
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
                    ))}
                </div>
            </div>
        </section>
    );
}
