import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

export default function CodeBlock({ code, language }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-8">
            <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all active:scale-95"
                >
                    {copied ? (
                        <>
                            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>¡Copiado!</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            <span>Copiar</span>
                        </>
                    )}
                </button>
            </div>

            <div className="absolute left-4 -top-3 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider z-10"
                style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                {language}
            </div>

            <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={`${className} p-6 pt-10 rounded-2xl overflow-x-auto shadow-2xl border border-white/5 font-mono text-sm leading-relaxed`} 
                        style={{ ...style, backgroundColor: 'rgba(10, 15, 30, 0.95)' }}>
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })}>
                                <span className="opacity-30 mr-4 select-none inline-block w-4 text-right">{i + 1}</span>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    );
}
