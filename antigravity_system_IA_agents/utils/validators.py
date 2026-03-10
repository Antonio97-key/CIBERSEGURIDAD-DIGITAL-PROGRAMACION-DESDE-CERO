"""
VALIDADOR DE PROYECTOS
Valida que las especificaciones cumplan con estándares
"""

from typing import Dict, Any, List
import logging

logger = logging.getLogger(__name__)


class ValidarProyecto:
    """Validador de especificaciones de proyecto"""
    
    def __init__(self):
        self.errores = []
        self.advertencias = []
    
    def validar(self, especificaciones: Dict[str, Any]) -> Dict[str, Any]:
        """Validar especificaciones completas"""
        self.errores = []
        self.advertencias = []
        
        # Validaciones obligatorias
        self._validar_campos_obligatorios(especificaciones)
        self._validar_tecnologias(especificaciones)
        self._validar_seguridad(especificaciones)
        self._validar_requisitos_performance(especificaciones)
        self._validar_accesibilidad(especificaciones)
        
        valido = len(self.errores) == 0
        
        return {
            'valido': valido,
            'errores': self.errores,
            'advertencias': self.advertencias,
            'score': self._calcular_score()
        }
    
    def _validar_campos_obligatorios(self, especificaciones: Dict):
        """Validar campos obligatorios"""
        obligatorios = ['nombre', 'descripcion', 'tipo_proyecto']
        
        for campo in obligatorios:
            if campo not in especificaciones:
                self.errores.append(f"Campo obligatorio faltante: {campo}")
            elif not especificaciones[campo]:
                self.errores.append(f"Campo {campo} no puede estar vacío")
    
    def _validar_tecnologias(self, especificaciones: Dict):
        """Validar selección de tecnologías"""
        tecnologias = especificaciones.get('tecnologia', {})
        
        if not tecnologias:
            self.advertencias.append(
                "No se especificaron tecnologías. Se usarán defaults recomendadas"
            )
        
        # Validar combinaciones compatibles
        frontend = tecnologias.get('frontend', '')
        backend = tecnologias.get('backend', '')
        
        # Ejemplo de validación
        if 'Vue' in frontend and 'Rails' in backend:
            self.advertencias.append(
                "Vue + Rails es posible pero poco común. Considera React + Express"
            )
    
    def _validar_seguridad(self, especificaciones: Dict):
        """Validar requisitos de seguridad"""
        seguridad = especificaciones.get('seguridad', {})
        
        if not seguridad.get('autenticacion'):
            self.advertencias.append(
                "Se implementará autenticación por defecto (OAuth2 + JWT)"
            )
        
        if not seguridad.get('encriptacion'):
            self.advertencias.append(
                "Se implementará encriptación AES-256 por defecto"
            )
        
        # Validar compliance
        si_maneja_datos_sensibles = especificaciones.get('datos_sensibles', False)
        if si_maneja_datos_sensibles:
            if not seguridad.get('compliance'):
                self.advertencias.append(
                    "Datos sensibles detectados. Validar compliance GDPR/PCI-DSS"
                )
    
    def _validar_requisitos_performance(self, especificaciones: Dict):
        """Validar que requisitos de performance son alcanzables"""
        performance = especificaciones.get('performance', {})
        
        lighthouse = performance.get('lighthouse_score', 95)
        if lighthouse > 100:
            self.errores.append("Score de Lighthouse no puede ser > 100")
        
        if lighthouse < 80:
            self.advertencias.append(
                f"Score Lighthouse {lighthouse} es bajo. Recomendado >= 90"
            )
        
        lcp = performance.get('lcp', '2.5s')
        if 'ms' in str(lcp):
            ms = int(lcp.replace('ms', ''))
            if ms > 2500:
                self.advertencias.append(
                    f"LCP {lcp} es lento. Target es < 1.2s"
                )
    
    def _validar_accesibilidad(self, especificaciones: Dict):
        """Validar requisitos de accesibilidad"""
        accesibilidad = especificaciones.get('accesibilidad', 'WCAG 2.1 AA')
        
        niveles_validos = ['WCAG 2.1 A', 'WCAG 2.1 AA', 'WCAG 2.1 AAA']
        if accesibilidad not in niveles_validos:
            self.advertencias.append(
                f"Nivel de accesibilidad no válido. Se usará default: WCAG 2.1 AA"
            )
    
    def _calcular_score(self) -> int:
        """Calcular score de validación"""
        total = 100
        total -= len(self.errores) * 20
        total -= len(self.advertencias) * 5
        return max(0, total)
