---
title: "❓ [TU PREGUNTA]"
labels: question
---

## 📌 **Consulta**
<!-- Explica claramente tu duda o problema -->
**Ejemplo**:  
"¿Cómo implementar permisos de roles para el comando `/moderate` en Discord.js v14?"

## 🔍 **Lo que he intentado**
```javascript
// Código relevante (opcional)
client.commands.set('moderate', {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    // ¿Falta validar roles aquí?
  }
});
