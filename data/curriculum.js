export const curriculum = {
    ciberseguridad: {
        redes: {
            title: 'Fundamentos de Redes',
            description: 'Comprender cómo viaja la información desde tu dispositivo hasta un servidor en el otro lado del mundo.',
            lessons: [
                { 
                    id: 'modelo-osi', 
                    title: 'El Modelo OSI', 
                    readingTime: '10 min',
                    quiz: {
                        question: "¿Cuál es la función principal de la Capa de Enlace de Datos (Capa 2) en el modelo OSI?",
                        options: [
                            "Direccionamiento lógico y enrutamiento (IP)",
                            "Transferencia fiable de tramas a través de un enlace físico (MAC)",
                            "Presentación de datos y cifrado",
                            "Gestión de sesiones entre aplicaciones"
                        ],
                        correctAnswer: 1,
                        explanation: "La Capa 2 (Data Link) se encarga del direccionamiento físico (MAC) y la transferencia de tramas entre nodos adyacentes."
                    }
                },
                { 
                    id: 'tcp-ip', 
                    title: 'TCP/IP en profundidad', 
                    readingTime: '15 min',
                    challenge: {
                        title: "El Flag del Handshake",
                        description: "Durante un Handshake de 3 vías, el servidor envió un flag oculto en la cabecera personalizada 'X-Security-Flag'. Si el SYN tuvo el número de secuencia 1000 y el SYN-ACK tuvo el 2000, ¿cuál es el flag si el formato es 'SYN{sec_number}'?",
                        flag: "SYN{1000}",
                        hint: "La flag utiliza el número de secuencia del primer paquete enviado por el cliente.",
                        difficulty: "Fácil",
                        points: 150
                    }
                },
                { 
                    id: 'puertos', 
                    title: 'Puertos y Servicios', 
                    readingTime: '12 min',
                    playground: {
                        language: 'python',
                        title: 'Simulador de Port Scanning',
                        initialCode: 'import socket\n\ndef scan(port):\n    print(f"Escaneando puerto {port}...")\n    # En el playground, simulamos el resultado\n    if port in [80, 443, 22]:\n        print(f"Puerto {port}: ABIERTO")\n    else:\n        print(f"Puerto {port}: CERRADO")\n\nfor p in [21, 22, 80, 404]:\n    scan(p)'
                    }
                },
                { id: 'dns', title: 'DNS y vectores de ataque', readingTime: '10 min' },
                { id: 'firewalls', title: 'Firewalls e IDS/IPS', readingTime: '12 min' },
                { id: 'vpn-proxies', title: 'VPNs y Proxies', readingTime: '10 min' },
                { id: 'wireshark', title: 'Análisis con Wireshark', readingTime: '15 min' },
                { id: 'segmentacion', title: 'Segmentación y VLANS', readingTime: '12 min' }
            ]
        },
        criptografia: {
            title: 'Criptografía',
            description: 'Aprende cómo se protege la información mediante algoritmos matemáticos.',
            lessons: [
                { id: 'historia', title: 'Historia de la criptografía', readingTime: '10 min' },
                { id: 'simetrico', title: 'Cifrado simétrico en detalle', readingTime: '20 min' },
                { id: 'asimetrico', title: 'Cifrado asimétrico y RSA', readingTime: '25 min' },
                { 
                    id: 'hash', 
                    title: 'Funciones Hash', 
                    readingTime: '15 min',
                    playground: {
                        language: 'javascript',
                        title: 'Generador de Integridad (Pseudo-Hash)',
                        initialCode: 'function simpleHash(text) {\n    let hash = 0;\n    for (let i = 0; i < text.length; i++) {\n        hash = (hash << 5) - hash + text.charCodeAt(i);\n        hash |= 0;\n    }\n    return hash.toString(16);\n}\n\nconsole.log("Hash de \'password123\':", simpleHash("password123"));\nconsole.log("Hash de \'Password123\':", simpleHash("Password123"));'
                    }
                },
                { id: 'pki', title: 'PKI y Certificados SSL/TLS', readingTime: '20 min' },
                { id: 'tls-13', title: 'TLS 1.3 en profundidad', readingTime: '15 min' }
            ]
        },
        malware: {
            title: 'Malware y Amenazas',
            description: 'Conoce los diferentes tipos de software malicioso y cómo operan.',
            lessons: [
                { id: 'taxonomia', title: 'Taxonomía del malware', readingTime: '12 min' },
                { id: 'ransomware', title: 'Ransomware en profundidad', readingTime: '15 min' },
                { id: 'spyware', title: 'Spyware y Keyloggers', readingTime: '10 min' },
                { id: 'rootkits', title: 'Rootkits y APTs', readingTime: '15 min' }
            ]
        },
        'ingenieria-social': {
            title: 'Ingeniería Social',
            description: 'El eslabón más débil suele ser el humano. Aprende las tácticas de manipulación.',
            lessons: [
                { id: 'psicologia', title: 'Psicología del engaño', readingTime: '10 min' },
                { id: 'phishing', title: 'Phishing avanzado', readingTime: '15 min' },
                { id: 'osint', title: 'OSINT básico', readingTime: '12 min' }
            ]
        },
        'web-security': {
            title: 'Seguridad Web (OWASP)',
            description: 'Las vulnerabilidades web más críticas y cómo mitigarlas.',
            lessons: [
                { id: 'owasp-intro', title: 'Introducción a OWASP', readingTime: '10 min' },
                { id: 'broken-access', title: 'A01: Broken Access Control', readingTime: '15 min' },
                { id: 'sqli', title: 'A03: SQL Injection', readingTime: '20 min' },
                { id: 'xss', title: 'A10: Cross-Site Scripting (XSS)', readingTime: '20 min' },
                { id: 'broken-auth', title: 'A07: Identification and Authentication Failures', readingTime: '15 min' }
            ]
        },
        forense: {
            title: 'Análisis Forense Digital',
            description: 'Descubre cómo investigar incidentes y recuperar evidencias.',
            lessons: [
                { id: 'principios', title: 'Principios forenses', readingTime: '10 min' },
                { id: 'memoria', title: 'Forense de Memoria RAM', readingTime: '20 min' },
                { id: 'logs', title: 'Análisis de Logs', readingTime: '15 min' }
            ]
        },
        pentesting: {
            title: 'Ethical Hacking y Pentesting',
            description: 'Aprende a atacar sistemas de forma ética para descubrir vulnerabilidades.',
            lessons: [
                { id: 'metodologia', title: 'Metodología PTES', readingTime: '15 min' },
                { id: 'reconocimiento', title: 'Reconocimiento y Footprinting', readingTime: '20 min' },
                { id: 'explotacion', title: 'Explotación y Metasploit', readingTime: '25 min' }
            ]
        }
    },
    programacion: {
        python: {
            title: 'Python para Seguridad',
            description: 'Desde variables básicas hasta scripts de automatización de hacking.',
            lessons: [
                { 
                    id: 'intro', 
                    title: 'Introducción a Python', 
                    readingTime: '10 min',
                    playground: {
                        language: 'python',
                        title: 'Hola, Mundo en Python',
                        initialCode: 'print("¡Hola desde el Playground de Python 3.11!")\n# Prueba a realizar un cálculo:\nprint(f"2 + 2 = {2 + 2}")'
                    }
                },
                { 
                    id: 'variables', 
                    title: 'Variables y Tipos', 
                    readingTime: '12 min',
                    playground: {
                        language: 'python',
                        title: 'Manipulación de Variables',
                        initialCode: 'nombre = "Hacker"\nedad = 28\nprint(f"Usuario: {nombre}, Nivel: {edad}")\n# Tipos de datos\nprint(type(nombre))\nprint(type(edad))'
                    }
                },
                { id: 'sockets', title: 'Sockets y Redes con Python', readingTime: '20 min' },
                { id: 'automation', title: 'Automatización de Tareas', readingTime: '15 min' }
            ]
        },
        javascript: {
            title: 'JavaScript y Seguridad Web',
            description: 'Entiende cómo interactúa JS con el navegador y cómo proteger el frontend.',
            lessons: [
                { 
                    id: 'intro', 
                    title: 'Fundamentos de JS', 
                    readingTime: '10 min',
                    playground: {
                        language: 'javascript',
                        title: 'Primeros Pasos con JS',
                        initialCode: "console.log('¡Hola, Desarrollador!');\nconst x = 10;\nconsole.log('El valor de x es:', x);\n// Prueba a sumar 20 a x y mostrarlo en la consola."
                    },
                    quiz: {
                        question: "¿Qué palabra clave se usa para declarar una variable que no cambiará su valor?",
                        options: [
                            "let",
                            "var",
                            "const",
                            "fixed"
                        ],
                        correctAnswer: 2,
                        explanation: "'const' (Constant) se utiliza para declarar variables cuyo valor no puede ser reasignado tras su inicialización."
                    }
                },
                { 
                    id: 'dom-security', 
                    title: 'DOM y Seguridad', 
                    readingTime: '15 min',
                    challenge: {
                        title: "Infiltración DOM",
                        description: "Un script malicioso intenta robar una flag del objeto 'window'. Si el atacante ejecutó 'window.flag = 'XSS_MASTER'', ¿cual es la flag que debes capturar?",
                        flag: "XSS_MASTER",
                        hint: "La respuesta está literalmente en la descripción del ataque.",
                        difficulty: "Principiante",
                        points: 100
                    }
                },
                { id: 'webcrypto', title: 'WebCrypto API', readingTime: '20 min' }
            ]
        },
        bash: {
            title: 'Bash Scripting / Linux',
            description: 'Domina la terminal de Linux, esencial para cualquier profesional de seguridad.',
            lessons: [
                { id: 'comandos-basicos', title: 'Comandos Esenciales', readingTime: '10 min' },
                { id: 'scripting', title: 'Scripting en Bash', readingTime: '15 min' },
                { id: 'hardening', title: 'Hardening de Linux', readingTime: '20 min' }
            ]
        },
        sql: {
            title: 'SQL y Seguridad de DB',
            description: 'Domina las bases de datos y aprende a protegerlas contra inyecciones y fugas de datos.',
            lessons: [
                { id: 'intro-sql', title: 'Introducción a SQL', readingTime: '10 min', playground: { language: 'javascript', title: 'Simulador SQL', initialCode: '// Simulando una query SQL\nconst db = ["admin", "user1", "guest"];\nconst query = (val) => db.filter(u => u.includes(val));\nconsole.log("Resultado SQL:", query("a"));' } },
                { id: 'select-where', title: 'SELECT y WHERE', readingTime: '12 min' },
                { id: 'joins', title: 'JOINS y Relaciones', readingTime: '15 min' },
                { id: 'agregaciones', title: 'Funciones de Agregación', readingTime: '12 min' },
                { id: 'subconsultas', title: 'Subconsultas Avanzadas', readingTime: '15 min' },
                { id: 'ddl-dml', title: 'DDL vs DML', readingTime: '10 min' },
                { id: 'indices', title: 'Índices y Optimización', readingTime: '15 min' },
                { id: 'transacciones', title: 'Transacciones y ACID', readingTime: '12 min' },
                { id: 'privilegios', title: 'Gestión de Privilegios', readingTime: '15 min' },
                { id: 'sqli-basics', title: 'SQL Injection: Fundamentos', readingTime: '20 min' },
                { id: 'sqli-union', title: 'SQLi basada en UNION', readingTime: '20 min' },
                { id: 'sqli-blind', title: 'Blind SQLi y Tiempos', readingTime: '25 min' },
                { id: 'nosql-intro', title: 'Introducción a NoSQL', readingTime: '15 min' },
                { id: 'nosql-sec', title: 'Seguridad en NoSQL', readingTime: '15 min' },
                { id: 'examen-sql', title: 'Examen Final SQL', readingTime: '30 min', quiz: { question: "¿Qué técnica previene eficazmente la inyección SQL?", options: ["Filtrar strings", "Usar sentencias preparadas", "Ocultar la base de datos", "Usar GET en lugar de POST"], correctAnswer: 1, explanation: "Las sentencias preparadas separan la consulta de los datos, evitando que el motor SQL interprete los datos como código." } }
            ]
        },
        git: {
            title: 'Git y Seguridad del Código',
            description: 'Control de versiones seguro. Aprende a no comprometer secretos en tus repositorios.',
            lessons: [
                { id: 'intro-git', title: '¿Qué es Git?', readingTime: '10 min' },
                { id: 'workflow', title: 'Workflow de Git', readingTime: '12 min' },
                { id: 'branches', title: 'Ramas y Estrategias', readingTime: '15 min' },
                { id: 'commits', title: 'Commits Atómicos', readingTime: '10 min' },
                { id: 'secrets', title: 'Fuga de Secretos (.env)', readingTime: '20 min' },
                { id: 'git-hooks', title: 'Git Hooks para Seguridad', readingTime: '15 min' },
                { id: 'ssh-signing', title: 'Firma de Commits (SSH/GPG)', readingTime: '15 min' },
                { id: 'ci-cd-sec', title: 'Seguridad en CI/CD', readingTime: '20 min' },
                { id: 'audit', title: 'Auditoría de Repositorios', readingTime: '15 min' },
                { id: 'examen-git', title: 'Examen Final Git', readingTime: '20 min' }
            ]
        }
    }
};

export const getLessonContent = (module, lesson) => {
    const contents = {
        'redes/modelo-osi': `
## El Modelo OSI
El modelo de interconexión de sistemas abiertos (OSI) es un marco conceptual que describe cómo se comunican las computadoras a través de una red.

### Las 7 Capas
1. **Física:** Se encarga de la transmisión de bits puros sobre un medio físico (cables, señales de radio).
2. **Enlace de datos:** Proporciona transferencia de datos nodo a nodo. Aquí operan las direcciones **MAC**.
3. **Red:** Responsable del enrutamiento de paquetes. Utiliza direcciones **IP**.
4. **Transporte:** Garantiza la entrega fiable (TCP) o rápida (UDP) de los datos.
5. **Sesión:** Gestiona las conexiones entre aplicaciones.
6. **Presentación:** Traduce los datos (cifrado, compresión) para la capa de aplicación.
7. **Aplicación:** Interacción directa con el usuario (HTTP, FTP, DNS).

> **Tip de Seguridad:** Muchos ataques ocurren en capas específicas. Por ejemplo, el ARP Spoofing ocurre en la Capa 2, mientras que el SQL Injection ocurre en la Capa 7.
        `,
        'redes/tcp-ip': `
## TCP/IP en profundidad
El conjunto de protocolos TCP/IP es la base de la comunicación en Internet. A diferencia del modelo OSI, se divide comúnmente en 4 capas.

### El Handshake de 3 Vías (TCP)
Para establecer una conexión fiable, TCP utiliza tres pasos:
1. **SYN (Synchronize):** El cliente envía un paquete con un número de secuencia inicial (ISN).
2. **SYN-ACK (Synchronize-Acknowledgment):** El servidor responde confirmando la recepción e incluyendo su propio ISN.
3. **ACK (Acknowledgment):** El cliente confirma la recepción del paquete del servidor.

### ¿Por qué es importante para la seguridad?
Ataques como el **SYN Flood** aprovechan este mecanismo enviando miles de peticiones SYN sin completar el tercer paso, agotando los recursos del servidor.
        `,
        'criptografia/historia': `
## Historia de la criptografía
Desde el cifrado César hasta los algoritmos modernos como AES-256. El cifrado simétrico usa la misma clave para cifrar y descifrar, mientras que el asimétrico usa pares de claves pública/privada.
        `,
        'web-security/sqli': `
## SQL Injection
La inyección SQL ocurre cuando datos no confiables se envían a un intérprete de consultas.
Siempre usa sentencias preparadas (Prepared Statements) en lugar de concatenar strings en tus consultas SQL.
        `,
        'python/intro': `
## Introducción a Python
Python es el lenguaje preferido por los hackers debido a su simplicidad y potencia.
\`\`\`python
print("Hola, hacker ético")
x = 10
if x > 5:
    print("X es mayor que 5")
\`\`\`
        `,
        'javascript/intro': `
## Fundamentos de JavaScript
JavaScript es el alma de la web moderna. Permite crear interfaces dinámicas y, desafortunadamente, también es el vehículo para muchos ataques web.

### Variables Modernas
- **const**: Para valores que no cambian (inmutables por reasignación).
- **let**: Para valores que cambian dentro de un bloque.

\`\`\`javascript
const API_URL = "https://api.seguridad.com";
let intentos = 0;

intentos++;
console.log(\`Intento número: \${intentos}\`);
\`\`\`

### Importancia en Seguridad
Entender JS es crucial para defenderse contra **XSS (Cross-Site Scripting)**, donde un atacante inyecta scripts maliciosos en páginas vistas por otros usuarios.
        `,
        'bash/comandos-basicos': `
## Comandos Esenciales de Linux
- **ls**: listar archivos
- **cd**: cambiar directorio
- **grep**: buscar patrones en texto
- **chmod**: cambiar permisos
- **chown**: cambiar propietario
- **sudo**: ejecutar con privilegios de superusuario
        `,
        'sql/intro-sql': `
## Introducción a SQL
SQL (Structured Query Language) es el lenguaje estándar para interactuar con bases de datos relacionales. 

### ¿Por qué es vital para la seguridad?
Las bases de datos son el "tesoro" que los atacantes buscan. Enteder cómo se consultan los datos es el primer paso para protegerlos o para identificar vulnerabilidades de inyección.
        `,
        'sql/sqli-basics': `
## SQL Injection: Fundamentos
La inyección SQL es una de las vulnerabilidades más antiguas y peligrosas. Ocurre cuando un atacante puede "inyectar" código SQL propio en una consulta de la aplicación.

### Ejemplo de Vulnerabilidad
\`\`\`sql
-- Consulta vulnerable (concatenación)
"SELECT * FROM users WHERE username = '" + user_input + "';"
\`\`\`
Si el usuario ingresa \`admin' --\`, la consulta se convierte en:
\`SELECT * FROM users WHERE username = 'admin' --';\`
El \`--\` comenta el resto de la query, permitiendo el bypass de autenticación.
        `,
        'git/intro-git': `
## ¿Qué es Git?
Git es un sistema de control de versiones distribuido. Permite rastrear cambios en el código y colaborar con otros desarrolladores.

### El Riesgo de Seguridad
El historial de Git es permanente. Si subes una contraseña por error y luego la borras, **seguirá estando en el historial** a menos que reescribas el pasado del repositorio.
        `,
        'git/secrets': `
## Fuga de Secretos (.env)
Uno de los errores más comunes es subir archivos de configuración con credenciales (API Keys, contraseñas de DB) al repositorio.

### Medidas de Prevención
1. **.gitignore:** Asegúrate de incluir \`.env\`, \`node_modules\` y carpetas de configuración sensible.
2. **Scanner de Secretos:** Usa herramientas como \`trufflehog\` o \`git-secrets\` para detectar credenciales antes del commit.
        `
    };
    
    return contents[`${module}/${lesson}`] || `# Contenido en construcción\nEsta lección (${lesson}) del módulo ${module} está siendo desarrollada.`;
};
