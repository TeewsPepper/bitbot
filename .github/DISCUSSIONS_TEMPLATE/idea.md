---
title: "💡 [IDEA] Título breve de la propuesta"
labels: idea
---

## 🎯 **Descripción de la Idea**
<!-- ¿Qué problema resuelve o qué mejora propone? -->
**Ejemplo**:  
"Un sistema de verificación por roles automático al reaccionar a un mensaje."

## 🤔 **Motivación**
<!-- ¿Por qué esto sería útil para el bot/servidor? -->
- Evita el trabajo manual de moderadores.
- Reduce errores humanos al asignar roles.

## 🛠 **Implementación Sugerida**
```javascript
// Pseudocódigo (opcional)
client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.emoji.name === '✅') {
    reaction.message.guild.members.addRole(user.id, 'Verificado');
  }
});
