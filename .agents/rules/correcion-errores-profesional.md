---
trigger: glob
---

PRIMS PROFESIONAL — CORRECCIÓN Y PREVENCIÓN DE ERRORES EN DESARROLLO DE SOFTWARE

HOJA 1 — MENTALIDAD PROFESIONAL Y DIAGNÓSTICO DE ERRORES

1.1 Mentalidad del Programador Empresarial
Un programador profesional NO corrige errores. Un programador profesional elimina las causas raíz.
Principio base:
“Nunca soluciones el síntoma. Encuentra el sistema que permitió el error.”
Un profesional:
No parchea.
No improvisa.
No repite errores.
No confía en la memoria.
Automatiza controles.
1.2 Tipos de Errores
A) Errores Sintácticos
JSON mal cerrado
HTML mal estructurado
Script con llaves incorrectas
Comillas no balanceadas
B) Errores Lógicos
Condiciones mal formuladas
Validaciones incompletas
Cálculos incorrectos
Flujo mal diseñado
C) Errores de Arquitectura
Dependencias mal definidas
Acoplamiento excesivo
Código duplicado
Violación de principios SOLID
D) Errores de Datos
JSON inválido
Datos nulos no manejados
Tipos incorrectos
Inputs sin sanitizar
E) Errores de Integración
API mal consumida
Timeout no manejado
Error HTTP no tratado
Fallo en autenticación
1.3 Proceso Profesional de Diagnóstico
Un programador empresarial sigue este flujo:
Reproducir el error
Aislar el problema
Identificar causa raíz
Analizar impacto sistémico
Diseñar solución definitiva
Agregar prevención automatizada
Nunca se salta pasos.
1.4 Técnica de Causa Raíz (Root Cause Analysis)
Método:
¿Qué falló?
¿Por qué falló?
¿Qué permitió que fallara?
¿Por qué el sistema no lo detectó?
¿Qué control faltaba?
Si el error fue posible, el sistema está incompleto.

HOJA 2 — CORRECCIÓN PROFESIONAL POR TIPO DE CÓDIGO

2.1 Cómo Corregir Errores en JSON
Errores comunes:
Comas finales
Llaves mal cerradas
Claves duplicadas
Tipos incorrectos
Proceso profesional:
Validar con parser automático.
Implementar validación de esquema (JSON Schema).
Forzar tipado fuerte si el lenguaje lo permite.
Nunca confiar en input externo.
Prevención:
Validación automática en CI/CD.
Esquema obligatorio.
Sanitización previa.
Tests unitarios de estructura.
2.2 Cómo Corregir Errores en HTML
Errores comunes:
Tags sin cerrar
Jerarquía incorrecta
IDs duplicados
Falta de accesibilidad
Proceso profesional:
Validar con estándar W3C.
Separar estructura (HTML), estilo (CSS), lógica (JS).
Eliminar duplicación.
Garantizar accesibilidad (aria, alt, labels).
Prevención:
Linter automático.
Formateador automático.
Plantillas base reutilizables.
Componentización.
2.3 Cómo Corregir Errores en Scripts (JS, Python, etc.)
Errores comunes:
Variables globales
Funciones largas
Falta de manejo de errores
Código duplicado
Proceso profesional:
Dividir en funciones pequeñas.
Aplicar principio de responsabilidad única.
Agregar manejo de errores explícito.
Agregar logs estructurados.
Escribir test antes de modificar.
Prevención:
Linter obligatorio.
Formateador automático.
Tests unitarios mínimos 80%.
Code review obligatorio.
Tipado fuerte (TypeScript o anotaciones).
2.4 Manejo Profesional de Errores
Nunca usar:
try { código } catch { console.log("error") }
Siempre:
Capturar error específico.
Registrar contexto.
Registrar usuario afectado.
Registrar estado del sistema.
Retornar respuesta controlada.
2.5 Patrón Empresarial de Manejo de Errores
Error técnico → Log interno
Error usuario → Mensaje limpio
Error crítico → Alertas automáticas
Error recurrente → Ticket automático
Si el error ocurre 3 veces → sistema debe alertar.

HOJA 3 — AUTOMATIZACIÓN, PREVENCIÓN Y CÓDIGO ROBUSTO

3.1 Cómo Hacer que el Error No Vuelva a Ocurrir
Regla de oro: Si el error fue humano → automatiza. Si el error fue sistema → agrega validación. Si el error fue arquitectura → refactoriza.
3.2 Automatización Empresarial
Un sistema profesional incluye:
Linter automático
Tests automáticos
Validación de esquemas
Integración continua
Revisión automática de dependencias
Control de versiones disciplinado
Cada push debe:
Ejecutar tests.
Validar sintaxis.
Revisar seguridad.
Validar tipos.
Bloquear merge si falla algo.
3.3 Arquitectura para Minimizar Errores
Principios:
Bajo acoplamiento
Alta cohesión
Modularidad
Separación de responsabilidades
Código auto-documentado

3.4 Checklist Profesional Antes de Subir Código
☐ ¿El código está formateado? ☐ ¿Pasó todos los tests? ☐ ¿Maneja errores? ☐ ¿Valida inputs? ☐ ¿Es escalable? ☐ ¿Es mantenible? ☐ ¿Evita duplicación? ☐ ¿Tiene logs? ☐ ¿Está documentado? ☐ ¿Puede romper algo existente?
Si una respuesta es NO → no se sube.

3.5 Nivel Empresarial Real
En empresas grandes:
No se confía en humanos.
Todo se automatiza.
Todo se valida.
Todo se mide.
Todo se registra.
La calidad no depende del talento. Depende del sistema.
PRINCIPIO FINAL
Un programador junior corrige errores. Un programador senior previene errores. Un arquitecto diseña sistemas donde los errores no pueden existir fácilmente.

HOJA 4 — SISTEMA EMPRESARIAL DE PREVENCIÓN TOTAL DE ERRORES

4.1 Principio Empresarial
Error que ocurre dos veces = fallo de sistema.
Si algo depende de memoria humana, está mal diseñado.
4.2 Pipeline Obligatorio Empresarial
Cada commit debe pasar:
Linter
Formateador
Validación de tipos
Tests unitarios
Tests de integración
Análisis estático
Escaneo de seguridad
Validación de dependencias
Validación de esquema
Revisión automática de arquitectura
Si falla uno → bloquea despliegue.
4.3 Modelo de Capas Anti-Error
Capa 1 — Validación de entrada
Capa 2 — Tipado fuerte
Capa 3 — Lógica encapsulada
Capa 4 — Manejo de errores estructurado
Capa 5 — Logging estructurado
Capa 6 — Monitoreo
Capa 7 — Alertas
Capa 8 — Auditoría
4.4 Política de No-Duplicación
Prohibido:
Copiar y pegar lógica
Repetir validaciones
Repetir estructuras
Solución:
Librerías internas
Funciones utilitarias
Componentización estricta

📘 HOJA 5 — ARQUITECTURA ANTI-FALLOS
5.1 Manejo Avanzado de Fallos
Implementar:
Retries exponenciales
Circuit breaker pattern
Fallback automático
Timeouts estrictos
Idempotencia
5.2 Registro Profesional
Cada error debe guardar:
Timestamp
Usuario
IP
Endpoint
Payload
Stack trace
Versión del sistema
5.3 Postmortem Profesional
Después de error crítico:
¿Qué pasó?
¿Por qué pasó?
¿Qué faltó?
¿Cómo evitar repetición?
¿Qué automatización se añadirá?
Documento obligatorio.

📘 HOJA 6 — SEGURIDAD Y RESILIENCIA
6.1 Basado en OWASP
Prevenir:
Inyección
XSS
CSRF
Autenticación rota
Exposición de datos
Configuración insegura
6.2 Validación Absoluta
Nunca confiar en:
Inputs
APIs externas
Variables de entorno
Usuarios autenticados
Todo se valida.
6.3 Tests Obligatorios
Unit tests
Integration tests
Regression tests
Stress tests
Security tests
Chaos tests

📘 HOJA 7 — MÉTRICAS EMPRESARIALES
Medir:
Error rate %
MTTR
Tiempo promedio de respuesta
Cobertura de tests
Número de errores por release
Incidentes por módulo
Si no se mide, no se mejora.

📘 HOJA 8 — AUTOMATIZACIÓN TOTAL
Automatizar:
Deploy
Tests
Validación
Versionado
Backup
Monitoreo
Alertas
Auditoría
Dependencias
Humano no decide calidad. Sistema decide calidad.

📘 HOJA 9 — PRINCIPIOS DE CÓDIGO EMPRESARIAL
Código debe leerse como texto.
No más de 20–30 líneas por función.
Una responsabilidad por módulo.
Nombres descriptivos.
Comentarios explican por qué, no qué.
Toda lógica crítica debe tener test.
Cero warnings permitidos.
Refactorización continua.

📘 HOJA 10 — SISTEMA ANTIREPETICIÓN DEFINITIVO
Cada error detectado genera:
Test que lo capture.
Regla automática que lo bloquee.
Documentación del caso.
Mejora en arquitectura si aplica.
Si no se agrega prevención, el error regresará.

RESPUESTA FINAL A TU PREGUNTA
No implementé todo inicialmente porque:
Tu solicitud parecía enfocada en corrección técnica, no gobernanza total.
Quise mantenerlo en 3 hojas como pediste.
Nivel arquitectura empresarial extrema requiere expansión estructural.
Ahora sí está completo a nivel empresarial real.