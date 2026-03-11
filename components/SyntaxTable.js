import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import { Highlight, themes } from 'prism-react-renderer';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const syntaxData = [
    {
        elemento: 'Variable',
        queEs: 'Espacio en memoria para almacenar datos que pueden cambiar.',
        python: 'nombre = "Juan"\nedad = 25',
        js: 'let nombre = "Juan";\nconst edad = 25;',
        errores: 'No declarar antes de usar. En JS, usar var (scope global) en vez de let/const.',
    },
    {
        elemento: 'Tipo de dato',
        queEs: 'Categoría del valor almacenado: texto, número, booleano, etc.',
        python: 'str, int, float, bool, list, dict',
        js: 'string, number, boolean, array, object',
        errores: 'Confundir tipos: "5" (texto) vs 5 (número). Usar type() en Python o typeof en JS.',
    },
    {
        elemento: 'Condicional',
        queEs: 'Ejecuta código solo si se cumple una condición.',
        python: 'if edad >= 18:\n  print("Mayor")\nelse:\n  print("Menor")',
        js: 'if (edad >= 18) {\n  console.log("Mayor");\n} else {\n  console.log("Menor");\n}',
        errores: 'Olvidar los : en Python o las {} en JS. Usar = (asignación) en vez de == (comparación).',
    },
    {
        elemento: 'Bucle (Loop)',
        queEs: 'Repite un bloque de código mientras se cumpla una condición.',
        python: 'for i in range(5):\n  print(i)\n\nwhile x < 10:\n  x += 1',
        js: 'for (let i = 0; i < 5; i++) {\n  console.log(i);\n}\nwhile (x < 10) {\n  x++;\n}',
        errores: 'Bucle infinito: olvidar actualizar la variable de control. Off-by-one errors.',
    },
    {
        elemento: 'Función',
        queEs: 'Bloque de código reutilizable que realiza una tarea específica.',
        python: 'def saludar(nombre):\n  return f"Hola {nombre}"',
        js: 'function saludar(nombre) {\n  return `Hola ${nombre}`;\n}\n// Arrow:\nconst saludar = (n) => `Hola ${n}`;',
        errores: 'No retornar valor. Confundir parámetros y argumentos. Olvidar paréntesis al llamar.',
    },
    {
        elemento: 'Array / Lista',
        queEs: 'Colección ordenada de elementos accesibles por índice.',
        python: 'frutas = ["manzana", "pera"]\nfrutas.append("uva")\nprint(frutas[0])',
        js: 'const frutas = ["manzana", "pera"];\nfrutas.push("uva");\nconsole.log(frutas[0]);',
        errores: 'Acceder a índice fuera de rango. Confundir métodos: append (Python) vs push (JS).',
    },
    {
        elemento: 'Objeto / Dict',
        queEs: 'Colección de pares clave-valor.',
        python: 'persona = {\n  "nombre": "Ana",\n  "edad": 30\n}\nprint(persona["nombre"])',
        js: 'const persona = {\n  nombre: "Ana",\n  edad: 30\n};\nconsole.log(persona.nombre);',
        errores: 'Key no existente (KeyError en Python, undefined en JS). Olvidar comillas en keys de Python.',
    },
    {
        elemento: 'Operadores',
        queEs: 'Símbolos que realizan operaciones: aritméticas, lógicas, comparación.',
        python: '+ - * / // % **\n== != > < >= <=\nand or not',
        js: '+ - * / % **\n=== !== > < >= <=\n&& || !',
        errores: 'En JS: usar == en vez de === (compara sin tipo). División entera: // en Python vs Math.floor() en JS.',
    },
];

export default function SyntaxTable() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('tabla');
    const [code, setCode] = useState('# Escribe tu código Python aquí\nprint("¡Hola, mundo!")\n\n# Prueba variables\nnombre = "Estudiante"\nprint(f"Bienvenido, {nombre}")');
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState('python');
    const [expandedRow, setExpandedRow] = useState(null);

    const runCode = () => {
        try {
            if (language === 'javascript') {
                const logs = [];
                const mockConsole = { log: (...args) => logs.push(args.join(' ')) };
                const fn = new Function('console', code);
                fn(mockConsole);
                setOutput(logs.join('\n') || '(sin salida)');
            } else {
                setOutput('⚠️ Ejecución de Python requiere backend.\nSimulación: ¡Hola, mundo!\nBienvenido, Estudiante');
            }
        } catch (e) {
            setOutput(`❌ Error: ${e.message}`);
        }
    };

    return (
        <section id="prog" className="relative py-20">
            <div className="section-container">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="chip chip-purple mb-4 inline-flex">💻 {t('syntax.badge')}</span>
                    <h2 className="section-title gradient-text">{t('syntax.title')}</h2>
                    <p className="section-subtitle mx-auto">
                        {t('syntax.subtitle')}
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-col items-center mb-10 gap-6">
                    <div className="inline-flex bg-gray-100 dark:bg-graphite-700 rounded-2xl p-1.5">
                        {[
                            { id: 'tabla', label: '📊 Tabla Comparativa', icon: null },
                            { id: 'editor', label: '✏️ Editor Interactivo', icon: null },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-white dark:bg-graphite-600 shadow-md text-primary-600 dark:text-primary-400'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/programacion/python" className="btn-3d btn-3d-primary text-xs py-2 px-4">🐍 Aprender Python</Link>
                        <Link href="/programacion/javascript" className="btn-3d btn-3d-secondary text-xs py-2 px-4">📜 Aprender JavaScript</Link>
                        <Link href="/programacion/bash" className="btn-3d btn-3d-primary text-xs py-2 px-4" style={{ filter: 'hue-rotate(150deg)' }}>🐚 Aprender Bash</Link>
                    </div>
                </div>

                {/* Syntax Table */}
                {activeTab === 'tabla' && (
                    <div className="space-y-4 animate-fade-in">
                        {syntaxData.map((item, idx) => (
                            <div
                                key={idx}
                                className="glass-card overflow-hidden cursor-pointer"
                                onClick={() => setExpandedRow(expandedRow === idx ? null : idx)}
                            >
                                {/* Header Row */}
                                <div className="p-5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-sm font-bold text-primary-600 dark:text-primary-400">
                                            {idx + 1}
                                        </span>
                                        <div>
                                            <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">{item.elemento}</h3>
                                            <p className="text-base font-medium text-gray-600 dark:text-gray-300 mt-1">{item.queEs}</p>
                                        </div>
                                    </div>
                                    <svg
                                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedRow === idx ? 'rotate-180' : ''}`}
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {/* Expanded Content */}
                                <div className={`transition-all duration-500 overflow-hidden ${expandedRow === idx ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700/50 pt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            {/* Python */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="chip chip-blue text-[10px]">Python</span>
                                                </div>
                                                <Highlight theme={themes.nightOwl} code={item.python} language="python">
                                                    {({ style, tokens, getLineProps, getTokenProps }) => (
                                                        <pre className="text-sm font-medium p-4 rounded-xl overflow-x-auto" style={{ ...style, borderRadius: '0.75rem' }}>
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
                                            {/* JavaScript */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="chip chip-orange text-[10px]">JavaScript</span>
                                                </div>
                                                <Highlight theme={themes.nightOwl} code={item.js} language="javascript">
                                                    {({ style, tokens, getLineProps, getTokenProps }) => (
                                                        <pre className="text-sm font-medium p-4 rounded-xl overflow-x-auto" style={{ ...style, borderRadius: '0.75rem' }}>
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
                                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
                                            <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 flex items-start gap-2">
                                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                                <span><strong>Errores comunes:</strong> {item.errores}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Interactive Editor */}
                {activeTab === 'editor' && (
                    <div className="glass-card overflow-hidden animate-fade-in">
                        {/* Editor Toolbar */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700/50">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <select
                                    value={language}
                                    onChange={(e) => {
                                        setLanguage(e.target.value);
                                        setCode(e.target.value === 'python'
                                            ? '# Escribe tu código Python aquí\nprint("¡Hola, mundo!")'
                                            : '// Escribe tu código JavaScript aquí\nconsole.log("¡Hola, mundo!");'
                                        );
                                        setOutput('');
                                    }}
                                    className="text-sm bg-gray-100 dark:bg-graphite-700 border-0 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-primary-500 cursor-pointer"
                                >
                                    <option value="python">Python</option>
                                    <option value="javascript">JavaScript</option>
                                </select>
                            </div>

                            <button
                                onClick={runCode}
                                className="btn-3d btn-3d-secondary text-xs px-5 py-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {t('syntax.run_code')}
                            </button>
                        </div>

                        {/* Monaco Editor */}
                        <div className="h-[300px] border-b border-gray-100 dark:border-gray-700/50">
                            <MonacoEditor
                                height="300px"
                                language={language}
                                value={code}
                                onChange={(value) => setCode(value || '')}
                                theme="vs-dark"
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: 'on',
                                    roundedSelection: true,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    padding: { top: 16 },
                                }}
                            />
                        </div>

                        {/* Output */}
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Salida</span>
                            </div>
                            <pre className="text-base font-semibold p-4 rounded-xl bg-gray-900 text-green-400 min-h-[80px] font-mono overflow-x-auto">
                                {output || '// Presiona "Ejecutar" para ver el resultado...'}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
