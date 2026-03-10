import Head from 'next/head';
import NavigationButtons from '../../../components/NavigationButtons';

export default function TCPIP() {
    return (
        <>
            <Head>
                <title>TCP/IP en profundidad | Seguridad Digital</title>
            </Head>
            
            <div className="prose prose-invert max-w-none">
                <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide" style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-primary)' }}>
                        Lección 2
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                        15 min de lectura
                    </span>
                </div>
                
                <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
                    TCP/IP en profundidad
                </h1>
                
                <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    El protocolo TCP (Transmission Control Protocol) es la base de las comunicaciones en Internet. A diferencia de UDP, TCP garantiza la entrega, el orden y la integridad de los datos. Entender cómo establece las conexiones es vital para detectar anomalías como escaneos de puertos o ataques DDoS.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4" style={{ color: 'var(--color-primary)' }}>
                    El Handshake de 3 Vías (Three-way Handshake)
                </h2>
                
                <p className="mb-6" style={{ color: 'var(--color-text)' }}>
                    Antes de que un cliente y un servidor puedan intercambiar datos, deben establecer una conexión. Este proceso consta de tres pasos exactos:
                </p>

                <div className="bg-gray-900 rounded-xl p-6 mb-8 border" style={{ borderColor: 'var(--color-border)' }}>
                    <ol className="space-y-4 m-0 pl-4 list-decimal" style={{ color: 'var(--color-text-muted)' }}>
                        <li><strong className="text-white">SYN (Synchronize):</strong> El cliente envía un paquete con la flag SYN activa indicando que quiere conectar y su número de secuencia inicial (ISN).</li>
                        <li><strong className="text-white">SYN-ACK (Synchronize-Acknowledge):</strong> El servidor responde confirmando la recepción (ACK) y enviando su propio número de secuencia (SYN).</li>
                        <li><strong className="text-white">ACK (Acknowledge):</strong> El cliente confirma la recepción del paquete del servidor. ¡La conexión está establecida!</li>
                    </ol>
                </div>

                <div className="p-6 rounded-2xl mb-8" style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-sky-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Nota de Seguridad (Ataque SYN Flood)
                    </h3>
                    <p className="m-0 text-sky-200">
                        Si un atacante envía miles de paquetes SYN pero nunca responde con el ACK final, el servidor mantiene los recursos bloqueados esperando. Esto es un ataque de Denegación de Servicio (DoS) conocido como SYN Flood. Las defensas modernas utilizan "SYN cookies" para mitigarlo.
                    </p>
                </div>

                <NavigationButtons 
                    prev={{ title: 'El Modelo OSI', path: '/ciberseguridad/redes/modelo-osi' }}
                    next={{ title: 'Puertos y Servicios', path: '/ciberseguridad/redes/puertos' }}
                />
            </div>
        </>
    );
}
