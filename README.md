# 🤖 Discord Bot - Vinculación de Usuario y Email

Este proyecto consiste en un bot de Discord diseñado para **asistir a los nuevos miembros del servidor** en el proceso de **vincular su nombre de usuario con su correo electrónico**. Además, proporciona instrucciones claras y respuestas automatizadas para facilitar el registro y la orientación inicial.

---

## 🎯 Objetivo

El objetivo principal es **agilizar la gestión de nuevos miembros** dentro de un servidor de Discord grande, asegurando que cada usuario reciba asistencia de manera rápida y eficaz.

Este bot representa el **primer paso** hacia un proyecto más ambicioso que busca gestionar equipos, usuarios y permisos en una comunidad de hasta 1000 personas organizadas en grupos.

---

## ✨ Funcionalidades

- ✅ **Bienvenida automática**: Cuando un nuevo miembro se une al servidor, el bot lo saluda y le sugiere cómo iniciar el proceso de registro.

- 💬 **Comando `/ayuda`**: Ofrece una guía con los pasos necesarios para vincular el correo electrónico con el nombre de usuario.

- 📣 **Respuesta a menciones**: Si el bot es mencionado, responde con un mensaje orientativo.

---

## 🛠 Requisitos

Antes de comenzar, asegúrate de tener lo siguiente instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- Un **token de bot** de Discord y el **ID de la aplicación**, disponibles desde el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications)

---

## 🚀 Instalación

1. **Clona el repositorio**:

```bash
   git clone https://github.com/TeewsPepper/bitbot.git
   cd bitbot


2. Instala las dependencias:

```bash
npm install


# Configura el entorno: Crea un archivo .env en la raíz del proyecto y agrega lo siguiente:

DISCORD_TOKEN=tu_token_aqui
APPLICATION_ID=tu_id_de_aplicacion_aqui
CANAL_BIENVENIDA_ID=id_del_canal_de_bienvenida
USERS_DATA_PATH=./data/dataUser.json (temporal)
REGISTER_URL=https://app.estructura.co/initiatives/human-development/subscription/control-user-email?ref=WH5598F161MW17889P2VZ0TIY9U6DDY0

```
3. Canal Discord

Crear un canal para los grupos Ej. grupo_1
crear Rol Muted (dejar permisos solo para leer mensajes)

4. Ejecuta el bot:
```bash

node index.js

```

## Si todo está correcto, verás en la consola:

    ✅ Bot conectado como [tu_bot]


🧩 Estructura del Proyecto

bitbot/
│
├── commands/ # 📦 Todos los comandos organizados por categoría
│ ├── generales/
│ │ ├── ayuda.js
│ │ ├── userinfo.js
│ │ └── serverinfo.js
│ ├── moderacion/
│ │ ├── ban.js
│ │ ├── unban.js
│ │ ├── kick.js
│ │ ├── mute.js
│ │ ├── unmute.js
│ │ ├── warn.js
│ │ ├── listar-warns.js
│ │ └── clear-warns.js
│ └── sistema/
│ ├── sistema.js # Subcomando con /subir, /bajar, /nivel
│ └── leaderboard.js
│
├── events/ # 📡 Eventos del bot
│ ├── ready.js
│ ├── guildMemberAdd.js
│ ├── messageCreate.js # Para lenguaje inapropiado y actividad
│ ├── messageReactionAdd.js
│ └── messageReactionRemove.js
│
├── utils/ # 🛠️ Funciones auxiliares
│ ├── helpers.js # Detectar lenguaje inapropiado, formateos
│ ├── colaboradores.js # Manejo de niveles, puntos, roles
│ ├── warns.js # Cargar/guardar advertencias
│ └── registerCommands.js # Registro de comandos slash
│
├── data/ # 🗃️ Archivos persistentes
│ ├── colaboradores.json # Niveles, puntos, etc.
│ └── advertencias.json # Advertencias por usuario
│
├── config/ # ⚙️ Configuración del bot
│ └── config.js # IDs, roles, canal logs, niveles
│
├── index.js # 🚀 Archivo principal
├── package.json
└── .env # Token y variables privadas

🤝 Contribuciones

¿Te interesa aprender sobre control de versiones y desarrollo colaborativo? ¡Este proyecto es una excelente oportunidad para empezar!
Cómo contribuir:

    Haz un fork del repositorio.

    Crea una nueva rama:

    
```bash
git checkout -b mi-nueva-funcionalidad

# Realiza tus cambios y verifica que todo funcione correctamente.

# Sube tus cambios:

    git push origin mi-nueva-funcionalidad

```

 # Abre un pull request desde GitHub.
    💡 Asegúrate de que tus cambios estén bien documentados y enfocados en mejorar la funcionalidad o la claridad del proyecto.

🧠 Nota final

Este bot no es solo una herramienta funcional, sino también un espacio de aprendizaje colectivo. Participar en su desarrollo puede ayudarte a:

    Mejorar tus habilidades con JavaScript y Node.js

    Aprender a usar Git y GitHub de forma colaborativa

    Contribuir a un proyecto real en crecimiento

¡Toda participación suma! 💪✨
````
