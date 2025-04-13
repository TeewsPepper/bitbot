---
name: "✨ Feature Request"
about: Sugerir una nueva funcionalidad para el bot
title: "[FEATURE] "
labels: enhancement
assignees: ""
---

### 📌 **Descripción**
<!-- ¿Qué problema resuelve o qué mejora aporta? -->
**Ejemplo**:  
"Un comando `/reminder` para programar recordatorios automáticos."

### 🎯 **Caso de Uso**
<!-- ¿Quién y cómo lo usará? -->
**Ejemplo**:  
"Los moderadores quieren recordar reuniones a los miembros 1 hora antes."

### 💡 **Implementación Sugerida (Opcional)**
```javascript
// Ejemplo para Discord.js
client.commands.set('reminder', {
  data: new SlashCommandBuilder()
    .setName('reminder')
    .setDescription('Programa un recordatorio'),
  async execute(interaction) {
    // Lógica aquí
  }
});
