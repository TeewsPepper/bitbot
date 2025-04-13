---
name: "📌 Pull Request"
about: Describe tus cambios
title: "[TIPO]: " # ¡Edita esto al crear el PR!
labels: ''
assignees: ''
---

<!-- Selecciona el tipo de PR con [x] -->
- [ ] ✨ **Feature** (nueva funcionalidad)
- [ ] 🐛 **Bugfix** (corrección de error)
- [ ] 📚 **Documentación**
- [ ] 🧹 **Refactor** (sin cambios funcionales)
- [ ] 🚀 **Otro**: _________________

## 📌 Descripción
<!-- ¿Qué problema resuelve o qué mejora aporta? Ejemplo para un bot: -->
"Implementa el comando `/poll` para crear encuestas con reacciones ✅/❌."

## 🛠 Cambios Realizados
- [ ] Nuevo: `/poll "Pregunta" "Op1" "Op2"`
- [ ] Base de datos: Tabla `polls` añadida
- [ ] Tests: `npm test` pasando

## 🌍 Impacto Técnico
<!-- Librerías/APIs afectadas -->
- **Discord.js**: Usa `Message#react()`
- **Node.js**: Requiere v18+
- **DB**: Migración necesaria (`/scripts/migrate.js`)

## ✅ Checklist
- [ ] El código sigue [nuestro ESLint](.eslintrc.js)
- [ ] Documentación actualizada en `docs/commands.md`
- [ ] No rompe compatibilidad con versiones anteriores

## 📸 Capturas (Opcional)
<!-- Muestra el antes/después en Discord -->
| Antes | Después |
|-------|---------|
| Sin polls | ![Nuevo comando](https://ejemplo.com/poll.png) |

## 🔗 Relacionado
<!-- Issues o discusiones -->
- Closes #123 
- Relacionado con #456
