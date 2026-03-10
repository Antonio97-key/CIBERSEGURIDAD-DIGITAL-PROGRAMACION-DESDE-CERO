"""
Antigravity - Sistema de Agentes IA Profesionales
Versión: 2.0 (2026 - 2050)

Agentes especializados:
- AgenteFrontendBackend: Arquitectura técnica
- AgenteSeguridad: Ciberseguridad
- AgenteSoftwareDesign: Diseño UI/UX
- AgenteErrorHandler: Testing y QA
"""

from .agent_frontend_backend import AgenteFrontendBackend
from .agent_security import AgenteSeguridad
from .agent_software_design import AgenteSoftwareDesign
from .agent_error_handler import AgenteErrorHandler
from .orchestrator import Orchestrator

__all__ = [
    'AgenteFrontendBackend',
    'AgenteSeguridad',
    'AgenteSoftwareDesign',
    'AgenteErrorHandler',
    'Orchestrator'
]

__version__ = '2.0'
__author__ = 'Antigravity Development'
__license__ = 'Proprietary'
