import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

export default function CodePlayground({ initialCode = '', language = 'javascript', title = 'Editor Interactivo' }) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [pyodide, setPyodide] = useState(null);
    const [stdout, setStdout] = useState('');

    // Load Pyodide for Python execution
    useEffect(() => {
        if (language === 'python' && !pyodide) {
            const loadPyodide = async () => {
                if (!window.loadPyodide) {
                    const script = document.createElement('script');
                    script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
                    script.onload = async () => {
                        const py = await window.loadPyodide();
                        setPyodide(py);
                    };
                    document.head.appendChild(script);
                } else {
                    const py = await window.loadPyodide();
                    setPyodide(py);
                }
            };
            loadPyodide();
        }
    }, [language, pyodide]);

    const runCode = async () => {
        setIsRunning(true);
        setOutput([]);
        setStdout('');

        try {
            if (language === 'javascript') {
                const logs = [];
                const originalLog = console.log;
                console.log = (...args) => {
                    logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
                };

                try {
                    // eslint-disable-next-line no-eval
                    eval(code);
                    setOutput(logs);
                } catch (err) {
                    setOutput([`Error: ${err.message}`]);
                } finally {
                    console.log = originalLog;
                }
            } else if (language === 'python') {
                if (!pyodide) {
                    setOutput(['Cargando motor de Python (Pyodide)...']);
                    return;
                }
                
                // Configure stdout capture
                pyodide.setStdout({
                    batched: (text) => {
                        setStdout(prev => prev + text + '\n');
                    }
                });

                try {
                    await pyodide.runPythonAsync(code);
                    // The stdout is updated via the batched callback
                } catch (err) {
                    setOutput([`Python Error: ${err.message}`]);
                }
            }
        } catch (globalErr) {
            setOutput([`Fatal Error: ${globalErr.message}`]);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="my-12 rounded-[32px] overflow-hidden border border-white/5 bg-graphite-900 shadow-2xl transition-all hover:shadow-primary-500/5">
            {/* Header / Toolbar */}
            <div className="bg-graphite-800/50 p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500">
                            Ambiente de Pruebas: {language === 'javascript' ? 'Node.js/Navegador' : 'Python 3.11'}
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => { setCode(initialCode); setOutput([]); setStdout(''); }}
                        className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
                    >
                        Reiniciar
                    </button>
                    <button
                        onClick={runCode}
                        disabled={isRunning}
                        className={`btn-3d ${isRunning ? 'opacity-50' : 'btn-3d-primary'} py-3 px-8 text-sm font-black flex items-center gap-3`}
                    >
                        {isRunning ? (
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                        )}
                        {isRunning ? 'Ejecutando...' : 'Correr Script'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5">
                {/* Editor Container */}
                <div className="h-[450px] relative transition-opacity group">
                    <Editor
                        height="100%"
                        language={language}
                        theme="vs-dark"
                        value={code}
                        onChange={(val) => setCode(val)}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            padding: { top: 20 },
                            fontFamily: "'Fira Code', monospace",
                            cursorSmoothCaretAnimation: "on",
                            smoothScrolling: true,
                            contextmenu: true,
                            renderLineHighlight: "all",
                            scrollbar: {
                                vertical: 'hidden',
                                horizontal: 'hidden'
                            }
                        }}
                    />
                    <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none">
                        <span className="text-[10px] font-bold text-white tracking-widest uppercase bg-black/50 px-3 py-1 rounded-full border border-white/10">
                            {language} (Editable)
                        </span>
                    </div>
                </div>

                {/* Console / Output */}
                <div className="h-[450px] bg-black/40 flex flex-col">
                    <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Consola de Salida</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Runtime: {isRunning ? 'Busy' : 'Idle'}</span>
                    </div>
                    
                    <div className="flex-grow p-6 font-mono text-sm overflow-auto custom-scrollbar">
                        {stdout || output.length > 0 ? (
                            <div className="space-y-2">
                                {stdout && (
                                    <pre className="text-gray-300 whitespace-pre-wrap">{stdout}</pre>
                                )}
                                {output.map((line, i) => (
                                    <div key={i} className="flex gap-3 animate-fade-in-up">
                                        <span className="text-gray-600 select-none">{i + 1}</span>
                                        <span className={line.startsWith('Error') ? 'text-red-400 font-bold' : 'text-primary-400'}>
                                            {line}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center opacity-20 select-none">
                                <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <p className="font-bold tracking-widest uppercase text-xs">Esperando ejecución...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Tip */}
            <div className="p-4 bg-primary-500/5 border-t border-white/5">
                <p className="text-[10px] font-medium text-gray-500 text-center italic">
                    <span className="font-black text-primary-500 uppercase not-italic mr-2">Dato Hacking:</span>
                    Python se ejecuta localmente en tu navegador usando Pyodide (WebAssembly). Tu código no sale de tu máquina.
                </p>
            </div>
        </div>
    );
}
