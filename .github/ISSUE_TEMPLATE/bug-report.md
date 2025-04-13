---
name: "🐛 Reporte de Bug"
about: Reportar un comportamiento inesperado o error en el sistema
title: "[BUG] "
labels: bug
assignees: ""
---

### 🔍 Descripción Concisa
<!-- 1-2 oraciones que resuman el problema -->
**Ejemplo**:  
"El comando `/verify` falla al procesar emails con espacios, sin enviar el correo de confirmación."

### 🎯 Impacto
<!-- ¿A quién afecta y cómo? -->

**Ejemplo**:  
"Los usuarios con espacios en su email no pueden verificar sus cuentas, bloqueando su acceso al servidor."

### 🛠 Pasos para Reproducir
<!-- Lista numerada y exacta -->

**Ejemplo**:
1. Ejecuta `/verify con espacios@ejemplo.com`
2. Espera 5 minutos
3. **Comportamiento actual**:  
   - No llega el email (incluyendo bandeja de spam)  
   - El bot no muestra mensajes de error
4. **Comportamiento esperado**:  
   - Email recibido en ≤1 minuto  
   - Mensaje de éxito en Discord

### 🌍 Ambiente Técnico
```bash
Node.js: v18.12.0
Discord.js: v14.11.0
Sistema Operativo: Ubuntu 22.04 LTS
```
### 📸 Evidencia (Opcional)
<!-- Capturas, logs, GIFs -->

**Ejemplo**:
[ERROR] 2023-12-20T14:30: RegexError - Invalid email: "con espacios@ejemplo.com"



