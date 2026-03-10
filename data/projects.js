export const projects = [
    {
        id: 'port-scanner',
        title: 'Escáner de Puertos Básico',
        difficulty: 'Principiante',
        category: 'Ciberseguridad',
        language: 'python',
        description: 'Desarrolla un script en Python que verifique si los puertos más comunes (80, 443, 22) están abiertos en una IP local.',
        goals: [
            'Entender el uso de la librería socket.',
            'Manejar excepciones de conexión.',
            'Formatear la salida en consola.'
        ],
        estimatedTime: '45 min'
    },
    {
        id: 'pass-validator',
        title: 'Validador de Contraseñas Pro',
        difficulty: 'Principiante',
        category: 'Programación',
        language: 'javascript',
        description: 'Crea una herramienta que evalúe la seguridad de una contraseña basándose en longitud, caracteres especiales y números.',
        goals: [
            'Uso de expresiones regulares (Regex).',
            'Lógica condicional anidada.',
            'Interacción con el DOM (opcional).'
        ],
        estimatedTime: '30 min'
    },
    {
        id: 'ip-calculator',
        title: 'Calculadora de Subredes IPv4',
        difficulty: 'Principiante',
        category: 'Redes',
        language: 'javascript',
        description: 'Un conversor que toma una dirección IP y una máscara de subred para calcular la dirección de red y broadcast.',
        goals: [
            'Manipulación de bits y operaciones binarias.',
            'Conversión de decimal a binario.',
            'Validación de formatos IP.'
        ],
        estimatedTime: '60 min'
    },
    {
        id: 'log-analyzer',
        title: 'Analizador Forense de Logs',
        difficulty: 'Principiante',
        category: 'Forense',
        language: 'javascript',
        description: 'Desarrolla una herramienta que analice logs de servidor buscando patrones de fuerza bruta (múltiples 401 en poco tiempo).',
        goals: [
            'Procesamiento de strings y arrays.',
            'Detección de patrones temporales.',
            'Generación de alertas visuales.'
        ],
        estimatedTime: '45 min'
    },
    {
        id: 'malware-behavior',
        title: 'Malware Behavioral Simulator',
        difficulty: 'Principiante',
        category: 'Malware',
        language: 'python',
        description: 'Crea un script que emule acciones sospechosas (crear archivos ocultos, editar registros) para que un antivirus lo detecte.',
        goals: [
            'Uso de la librería os y sys.',
            'Manipulación del sistema de archivos.',
            'Entender firmas de comportamiento.'
        ],
        estimatedTime: '40 min'
    },
    {
        id: 'rsa-lab',
        title: 'Laboratorio de Cifrado RSA',
        difficulty: 'Principiante',
        category: 'Criptografía',
        language: 'python',
        description: 'Implementa un generador de llaves RSA simplificado para entender cómo funciona el cifrado asimétrico matemáticamente.',
        goals: [
            'Algoritmo de Euclides Extendido.',
            'Generación de números primos.',
            'Operaciones de exponenciación modular.'
        ],
        estimatedTime: '90 min'
    },
    // INTERMEDIO (7)
    {
        id: 'arp-spoofer',
        title: 'ARP Spoofer de Red',
        difficulty: 'Intermedio',
        category: 'Redes',
        language: 'python',
        description: 'Crea una herramienta que capture el tráfico de una red local mediante envenenamiento de tablas ARP.',
        goals: ['Uso de la librería Scapy.', 'Envío de paquetes malformados.', 'IP Forwarding funcional.'],
        estimatedTime: '120 min'
    },
    {
        id: 'web-proxy',
        title: 'Proxy Web HTTP/S Interceptor',
        difficulty: 'Intermedio',
        category: 'Web',
        language: 'javascript',
        description: 'Construye un proxy que intercepte peticiones HTTP y permita modificar el contenido en tránsito (estilo Burp Suite).',
        goals: ['Manejo de flujos de red en Node.js.', 'Certificados SSL autofirmados.', 'Manipulación de headers.'],
        estimatedTime: '150 min'
    },
    {
        id: 'password-cracker',
        title: 'Cracker de Hashes Multihilo',
        difficulty: 'Intermedio',
        category: 'Criptografía',
        language: 'python',
        description: 'Desarrolla un rompedor de hashes que use diccionarios y fuerza bruta optimizada con multithreading.',
        goals: ['Librerías hashlib y threading.', 'Optimización de CPU.', 'Manejo de colas de trabajo.'],
        estimatedTime: '100 min'
    },
    {
        id: 'iot-scanner',
        title: 'Escáner de Vulnerabilidades IoT',
        difficulty: 'Intermedio',
        category: 'IoT',
        language: 'python',
        description: 'Herramienta para detectar dispositivos IoT en una red y verificar si usan credenciales por defecto (admin/admin).',
        goals: ['Protocolos mDNS y UPnP.', 'Diccionarios de credenciales.', 'Reporte de riesgo dinámico.'],
        estimatedTime: '90 min'
    },
    {
        id: 'payload-generator',
        title: 'Generador de Payloads Ofuscados',
        difficulty: 'Intermedio',
        category: 'Malware',
        language: 'javascript',
        description: 'Estructura una herramienta que convierta código simple en payloads altamente ofuscados imposibles de leer para humanos.',
        goals: ['Abstract Syntax Trees (AST).', 'Técnicas de encoding.', 'Antidebugging básico.'],
        estimatedTime: '140 min'
    },
    {
        id: 'sql-auto-injector',
        title: 'Scanner Automático de SQLi',
        difficulty: 'Intermedio',
        category: 'Web',
        language: 'python',
        description: 'Script que rastrea una URL buscando parámetros vulnerables y prueba diferentes payloads de inyección automáticamente.',
        goals: ['Librería requests y bs4.', 'Inyección basada en errores.', 'Automatización de fuzzing.'],
        estimatedTime: '180 min'
    },
    {
        id: 'file-carver',
        title: 'Recuperador Forense (File Carver)',
        difficulty: 'Intermedio',
        category: 'Forense',
        language: 'python',
        description: 'Recupera archivos de imágenes (PNG/JPG) borrados analizando los "Magic Bytes" de un dump de memoria.',
        goals: ['Lectura binaria de archivos.', 'Encabezados y pies de archivos.', 'Reconstrucción de datos.'],
        estimatedTime: '160 min'
    },

    // AVANZADO (7)
    {
        id: 'ai-malware-detect',
        title: 'Detector de Malware con IA',
        difficulty: 'Avanzado',
        category: 'AI / Seguridad',
        language: 'python',
        description: 'Entrena un modelo pequeño para clasificar archivos como maliciosos basándose en sus llamadas al sistema (System Calls).',
        goals: ['Scikit-learn para clasificación.', 'Feature Engineering.', 'Detección de anomalías.'],
        estimatedTime: '300 min'
    },
    {
        id: 'blockchain-audit',
        title: 'Auditor de Smart Contracts',
        difficulty: 'Avanzado',
        category: 'Blockchain',
        language: 'javascript',
        description: 'Analiza contratos inteligentes en busca de vulnerabilidades comunes como Reentrancy o Integer Overflow.',
        goals: ['Lógica de Solidity.', 'Simulación de transacciones.', 'Detección de patrones de riesgo.'],
        estimatedTime: '240 min'
    },
    {
        id: 'rootkit-sim',
        title: 'Rootkit de Modo Usuario (Simulación)',
        difficulty: 'Avanzado',
        category: 'Pentesting',
        language: 'python',
        description: 'Oculta procesos y archivos del sistema mediante el secuestro de llamadas a la API (API Hooking).',
        goals: ['Inyección de librerías dinámicas.', 'Hooking de funciones.', 'Persistencia en memoria.'],
        estimatedTime: '400 min'
    },
    {
        id: 'quantum-sec-lab',
        title: 'Criptografía Post-Cuántica (Kyber)',
        difficulty: 'Avanzado',
        category: 'Criptografía',
        language: 'python',
        description: 'Implementación del algoritmo Kyber para entender la defensa contra el "Shor Algorithm" del futuro.',
        goals: ['Matemáticas de Lattices.', 'Intercambio de llaves seguro.', 'Defensa post-cuántica.'],
        estimatedTime: '350 min'
    },
    {
        id: 'soc-dashboard',
        title: 'SIEM / Dashboard SOC Real-Time',
        difficulty: 'Avanzado',
        category: 'Forense',
        language: 'javascript',
        description: 'Visualiza ataques a gran escala en tiempo real usando WebSockets y datos de un Honeypot simulado.',
        goals: ['WebSockets para tiempo real.', 'D3.js para visualización.', 'Agregación de logs masivos.'],
        estimatedTime: '280 min'
    },
    {
        id: 'reverse-eng-toolkit',
        title: 'Desensamblador Básico (x86-64)',
        difficulty: 'Avanzado',
        category: 'Ingeniería Inversa',
        language: 'python',
        description: 'Convierte binarios compilados en su representación de código ensamblador legible para humanos.',
        goals: ['Librería Capstone.', 'Parsing de archivos ELF/PE.', 'Análisis de flujo de control.'],
        estimatedTime: '320 min'
    },
    {
        id: 'zero-trust-system',
        title: 'Sistema Zero-Trust Completo',
        difficulty: 'Avanzado',
        category: 'Arquitectura',
        language: 'javascript',
        description: 'Implementa una red donde nada se confía por defecto, requiriendo autenticación multifactor continua.',
        goals: ['Políticas de acceso dinámicas.', 'Micro-segmentación.', 'Identidad verificada constantemente.'],
        estimatedTime: '450 min'
    }
];
