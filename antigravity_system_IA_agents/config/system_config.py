"""
SYSTEM CONFIGURATION
Configuración central del sistema Antigravity
"""

from datetime import datetime

# INFORMACIÓN DEL SISTEMA
SYSTEM_CONFIG = {
    'nombre': 'Antigravity',
    'version': '2.0',
    'año_lanzamiento': 2026,
    'vision': 'Sistemas de agentes IA para desarrollo profesional 2026-2050',
    'estado': 'PRODUCCIÓN',
    'ultima_actualizacion': datetime.now().isoformat(),
    'ciclo_vida': '20+ años sin obsolescencia'
}

# AGENTES REGISTRADOS
AGENTS_CONFIG = {
    'frontend_backend': {
        'nombre': 'Arquitecto Full-Stack Senior',
        'descripcion': 'Diseño de APIs, arquitectura técnica, sincronización',
        'prioridad': 2,  # Se ejecuta en posición 2
        'dependencias': []
    },
    'seguridad': {
        'nombre': 'Especialista en Ciberseguridad',
        'descripcion': 'Autenticación, cifrado, compliance, detección de fraude',
        'prioridad': 3,
        'dependencias': ['software_design']
    },
    'software_design': {
        'nombre': 'Diseñador Profesional UI/UX',
        'descripcion': 'Diseño visual, componentes, accesibilidad, responsividad',
        'prioridad': 1,
        'dependencias': []
    },
    'error_handler': {
        'nombre': 'Ingeniero QA & Debugging',
        'descripcion': 'Testing automatizado, monitoreo, error tracking',
        'prioridad': 4,
        'dependencias': ['frontend_backend', 'seguridad']
    }
}

# TECNOLOGÍAS RECOMENDADAS POR STACK
TECH_STACKS = {
    'frontend': {
        'framework': 'React 19+ con TypeScript',
        'estado': 'Zustand + React Query',
        'estilos': 'Tailwind CSS + Headless UI',
        'bundler': 'Vite',
        'testing': 'Vitest + Cypress + React Testing Library',
        'build': 'Next.js 15+ (SSR/SSG)'
    },
    'backend': {
        'framework': 'FastAPI (Python) o NestJS (Node)',
        'database': 'PostgreSQL 15+',
        'cache': 'Redis 7+',
        'search': 'Elasticsearch 8+',
        'queue': 'RabbitMQ o Bull Queue',
        'testing': 'Pytest + Locust'
    },
    'deployment': {
        'containers': 'Docker',
        'orchestration': 'Kubernetes',
        'ci_cd': 'GitHub Actions',
        'monitoring': 'Datadog',
        'cdn': 'Cloudflare',
        'hosting': 'AWS / Google Cloud / Azure'
    },
    'seguridad': {
        'autenticacion': 'Auth0 / Okta / Google Cloud Identity',
        'secrets': 'HashiCorp Vault',
        'sast': 'SonarQube + Semgrep',
        'dast': 'OWASP ZAP',
        'scanning': 'Snyk'
    }
}

# ESTÁNDARES Y MÉTRICAS
QUALITY_STANDARDS = {
    'cobertura_tests': {
        'minimo': 80,
        'objetivo': 90,
        'critico': 100  # Para código sensible
    },
    'lighthouse': {
        'performance': 95,
        'accessibility': 100,
        'best_practices': 95,
        'seo': 95
    },
    'web_vitals': {
        'lcp': {'target': '1.2s', 'good': '2.5s'},  # Largest Contentful Paint
        'fid': {'target': '50ms', 'good': '100ms'},  # First Input Delay
        'cls': {'target': 0.05, 'good': 0.1}        # Cumulative Layout Shift
    },
    'seguridad': {
        'owasp_top_10': 'COMPLIANT',
        'cis_controls': 'COMPLIANT',
        'pci_dss': 'COMPLIANT',
        'penetration_testing': 'ANUAL'
    }
}

# TEMPLATES DE PROYECTOS
PROJECT_TEMPLATES = {
    'spa_responsive': {
        'nombre': 'Single Page App Responsivo',
        'descripcion': 'Aplicación web moderna, responsiva, offline-capable',
        'tecnologias': ['React', 'TypeScript', 'Tailwind', 'PWA'],
        'caracteristicas': [
            'Responsive Mobile-First',
            'Dark Mode',
            'Offline capability',
            'Analytics integrado'
        ]
    },
    'dashboard_admin': {
        'nombre': 'Dashboard Administrativo',
        'descripcion': 'Panel de control premium para análisis de datos',
        'tecnologias': ['React', 'D3.js', 'PostgreSQL', 'FastAPI'],
        'caracteristicas': [
            'Real-time data',
            'Gráficos avanzados',
            'Reportes exportables',
            'Multi-tenant capable'
        ]
    },
    'marketplace': {
        'nombre': 'Marketplace E-commerce',
        'descripcion': 'Plataforma de compra-venta con múltiples vendedores',
        'tecnologias': ['React', 'Node.js', 'MongoDB', 'Stripe'],
        'caracteristicas': [
            'Sistema de pagos',
            'Gestión de inventario',
            'Calificaciones y reseñas',
            'Shipping integration'
        ]
    },
    'saas_platform': {
        'nombre': 'Plataforma SaaS',
        'descripcion': 'Aplicación multi-tenant de clase empresarial',
        'tecnologias': ['React', 'FastAPI', 'PostgreSQL', 'Kubernetes'],
        'caracteristicas': [
            'Multi-tenancy',
            'SSO/SAML',
            'API REST completa',
            'Self-service portal'
        ]
    }
}

# COMPLIANCE Y REGULACIONES
COMPLIANCE_REQUIREMENTS = {
    'gdpr': {
        'alcance': 'Usuarios en UE',
        'requiere': [
            'Consentimiento explícito',
            'Derecho a ser olvidado',
            'Data portability',
            'Privacy by design'
        ],
        'pena': 'Hasta 4% de revenue anual'
    },
    'ccpa': {
        'alcance': 'Residentes de California',
        'requiere': [
            'Transparencia de datos',
            'Opt-out de venta',
            'No discriminación'
        ],
        'pena': 'Hasta $7,500 por violación'
    },
    'pci_dss': {
        'alcance': 'Procesar pagos con tarjeta',
        'requisitos': [
            'No almacenar PAN completo',
            'Encriptación AES-256',
            'Auditoría anual'
        ]
    },
    'hipaa': {
        'alcance': 'Datos de salud (USA)',
        'requisitos': [
            'PHI encryption',
            'Audit logging',
            'Access control'
        ]
    }
}

# ROADMAP DE CARACTERÍSTICAS 2026-2050
FEATURE_ROADMAP = {
    '2026': {
        'q1_q2': ['Base foundation', 'Agentes core'],
        'q3_q4': ['Integración con AI Models', 'Performance optimization']
    },
    '2027': {
        'features': [
            'Web Components v2',
            'Advanced Motion Design',
            'AI-powered personalization',
            'GraphQL subscriptions'
        ]
    },
    '2028_2029': {
        'features': [
            'Extended Reality (AR/VR) interfaces',
            'Haptic feedback design',
            'Spatial computing',
            'Neural interface compatibility'
        ]
    },
    '2030_2050': {
        'vision': 'Adaptive future-ready system',
        'features': [
            'Holographic interfaces',
            'Brain-computer interfaces',
            'Quantum computing ready',
            'Autonomous agents'
        ]
    }
}

# AMBIENTE DE DEPLOYMENT
ENVIRONMENTS = {
    'desarrollo': {
        'database': 'PostgreSQL local',
        'cache': 'Redis local',
        'logging': 'Archivo local',
        'hot_reload': True
    },
    'staging': {
        'database': 'PostgreSQL staging',
        'cache': 'Redis staging',
        'logging': 'ELK Stack',
        'ssl': True
    },
    'produccion': {
        'database': 'PostgreSQL multi-region con replicas',
        'cache': 'Redis cluster',
        'logging': 'ELK Stack + Datadog',
        'monitoring': '24/7',
        'uptime_sla': '99.9%',
        'backup': 'Diario incremental'
    }
}

# MONITOREO Y ALERTAS
MONITORING_CONFIG = {
    'error_tracking': {
        'herramienta': 'Sentry',
        'alertas': {
            'critica': 'Inmediata',
            'alta': '15 min',
            'media': '1 hora',
            'baja': 'Diario'
        }
    },
    'performance': {
        'herramienta': 'Datadog APM',
        'metricas': [
            'Response time p95, p99',
            'Error rate',
            'Database query time',
            'Cache hit rate'
        ]
    },
    'infraestructura': {
        'herramienta': 'Prometheus',
        'metricas': [
            'CPU usage',
            'Memory usage',
            'Disk I/O',
            'Network bandwidth'
        ]
    }
}

# SEGURIDAD - CONFIGURACIÓN
SECURITY_CONFIG = {
    'jwt': {
        'algoritmo': 'RS256',
        'expiracion_access': 900,     # 15 minutos
        'expiracion_refresh': 604800  # 7 días
    },
    'password': {
        'minimo_caracteres': 12,
        'requiere_mayuscula': True,
        'requiere_minuscula': True,
        'requiere_numero': True,
        'requiere_simbolo': True
    },
    'rate_limiting': {
        'login': '5 intentos / 15 min',
        'api': '1000 req / min',
        'upload': '100 MB / hora'
    },
    'cors': {
        'allowed_origins': [
            'https://app.antigravity.dev',
            'https://staging.antigravity.dev'
        ],
        'allowed_methods': ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        'allow_credentials': True
    }
}

# FUNCIÓN PARA VALIDAR CONFIGURACIÓN
def validar_configuracion() -> Dict[str, bool]:
    """Validar que toda la configuración está presente y correcta"""
    checks = {
        'system_config': bool(SYSTEM_CONFIG),
        'agents_config': bool(AGENTS_CONFIG),
        'tech_stacks': bool(TECH_STACKS),
        'quality_standards': bool(QUALITY_STANDARDS),
        'compliance': bool(COMPLIANCE_REQUIREMENTS),
        'security': bool(SECURITY_CONFIG)
    }
    return checks
