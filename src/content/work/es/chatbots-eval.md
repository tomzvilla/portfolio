---
title: "Evaluación de agentes de IA"
client: "Startup de IA · Europa"
period: "2026 → hoy"
order: 1
role: "Full stack"
stack: ["TypeScript", "React", "Node"]
problem: "Empresas que ponen agentes de IA frente a sus clientes sin saber cómo pueden fallar."
summary: "Desarrollo full stack de una plataforma que prueba agentes de IA de forma automática y reporta cada falla."
confidential: true
---

## Contexto

Una startup europea construye herramientas para que las empresas puedan confiar en sus agentes de IA: evaluarlos antes de salir a producción y controlarlos una vez que están frente a los usuarios.

## Qué construí

Trabajo en el desarrollo full stack de su plataforma de evaluación: la interfaz, la API y el modelo de datos. La plataforma corre miles de pruebas automáticas contra un agente, agrupadas por categoría de riesgo:

- **Respuestas inventadas:** el agente afirma algo que no está en sus fuentes.
- **Inyección de instrucciones:** alguien intenta que ignore sus reglas.
- **Filtración de datos personales:** el agente revela información que no debería.
- **Cumplimiento de políticas:** el agente se sale de lo que la empresa le permite.

Cada resultado queda puntuado, clasificado y trazable, para que lo revisen tanto ingeniería como cumplimiento.

## Con qué

TypeScript, React y Node.

## Resultado

Un producto en beta privada, en desarrollo desde 2026, que encuentra las fallas de un agente antes de que las encuentren sus usuarios.
