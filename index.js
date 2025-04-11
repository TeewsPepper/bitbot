require("dotenv").config();
const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");

// Configuración del cliente con los intents necesarios
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

// Evento: Cuando el bot se conecta
client.on("ready", () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

// Evento: Cuando un nuevo miembro se une al servidor
client.on("guildMemberAdd", (member) => {
  const welcomeChannel = member.guild.channels.cache.get(
    process.env.CANAL_BIENVENIDA_ID
  );

  if (welcomeChannel) {
    welcomeChannel.send(
      `¡Bienvenido ${member.user.username} al servidor! 🎉\nUsa \`/ayuda\` para comenzar.`
    );
  }

  member
    .send("¡Bienvenido! Escribe `/ayuda` para guiarte en el registro.")
    .catch(console.error);
});

// Registro de comandos de barra (/)
const commands = [
  {
    name: "ayuda",
    description: "Muestra la ayuda para el registro",
  },
  {
    name: "perfil",
    description: "Muestra tu perfil básico",
  },
  {
    name: "reglas",
    description: "Muestra las reglas del servidor",
  },
  {
    name: "info",
    description: "Muestra información del servidor",
  },
  {
    name: "ping",
    description: "Muestra la latencia del bot",
  },
  {
    name: "contribuir",
    description:
      "Muestra la informacion para contribuir con el desarrollo del bot",
  },
  {
    name: "ban",
    description: "Banea a un usuario",
    options: [
      {
        name: "usuario",
        type: 6, // USER
        description: "Usuario a banear",
        required: true,
      },
      {
        name: "razon",
        type: 3, // STRING
        description: "Razón del baneo",
        required: false,
      },
    ],
  },
  {
    name: "kick",
    description: "Expulsa a un usuario",
    options: [
      {
        name: "usuario",
        type: 6,
        description: "Usuario a expulsar",
        required: true,
      },
      {
        name: "razon",
        type: 3,
        description: "Razón de la expulsión",
        required: false,
      },
    ],
  },
  {
    name: "mute",
    description: "Silencia a un usuario",
    options: [
      {
        name: "usuario",
        type: 6,
        description: "Usuario a silenciar",
        required: true,
      },
      {
        name: "razon",
        type: 3,
        description: "Razón del muteo",
        required: false,
      },
    ],
  },
  {
    name: "unmute",
    description: "Des-silencia a un usuario",
    options: [
      {
        name: "usuario",
        type: 6,
        description: "Usuario a desmutear",
        required: true,
      },
    ],
  },
  {
    name: "warn",
    description: "Advierte a un usuario",
    options: [
      {
        name: "usuario",
        type: 6,
        description: "Usuario a advertir",
        required: true,
      },
      {
        name: "razon",
        type: 3,
        description: "Razón de la advertencia",
        required: false,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// Registrar comandos al iniciar
(async () => {
  try {
    await rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), {
      body: commands,
    });
    console.log("🔄 Comandos de barra registrados");
  } catch (error) {
    console.error("❌ Error al registrar comandos:", error);
  }
})();

// Evento: Interacción con comandos de barra
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  /*if (interaction.commandName === 'ayuda') {
    await interaction.reply({
      content: '**📌 Pasos para registrarte:**\n1. Verifica tu email\n2. Completa tu perfil con `/perfil`\n3. ¡Listo!',
      ephemeral: true, // ✔️ ESTA ES LA FORMA CORRECTA
    });
  }*/
  const { commandName, user, guild } = interaction;

  switch (commandName) {
    case "ayuda":
      await interaction.reply({
        content:
          "**📌 Pasos para registrarte:**\n1. Verifica tu email\n2. Completa tu perfil con `/perfil`\n3. ¡Listo!",
        ephemeral: true,
      });
      break;

    case "perfil":
      await interaction.reply({
        content: `👤 **Perfil de ${
          user.username
        }**\n📅 Cuenta creada: <t:${Math.floor(
          user.createdTimestamp / 1000
        )}:D>\n🆔 ID: ${user.id}`,
        ephemeral: true,
      });
      break;

    case "reglas":
      await interaction.reply({
        content:
          "**📜 Reglas del servidor:**\n1. Respeto mutuo\n2. No spam\n3. Seguir las indicaciones de los mods\n4. Divertite 😄",
        ephemeral: true,
      });
      break;

    case "info":
      await interaction.reply({
        content: `📊 **Info del servidor:**\n🔤 Nombre: ${guild.name}\n👥 Miembros: ${guild.memberCount}\n🆔 ID: ${guild.id}`,
        ephemeral: true,
      });
      break;

    case "ping":
      await interaction.reply({
        content: `🏓 ¡Pong! Latencia: **${
          Date.now() - interaction.createdTimestamp
        }ms**`,
        ephemeral: true,
      });
      break;

    case "ban": {
      if (!interaction.member.permissions.has("BanMembers")) {
        return interaction.reply({
          content: "🚫 No tenés permiso para usar este comando.",
          ephemeral: true,
        });
      }

      const usuario = interaction.options.getUser("usuario");
      const razon = interaction.options.getString("razon") || "Sin razón";

      const miembro = interaction.guild.members.cache.get(usuario.id);
      if (!miembro)
        return interaction.reply({
          content: "❌ No se pudo encontrar al usuario.",
          ephemeral: true,
        });

      await miembro.ban({ reason: razon });
      await interaction.reply(`🔨 ${usuario.tag} fue baneado. Razón: ${razon}`);
      break;
    }

    case "kick": {
      if (!interaction.member.permissions.has("KickMembers")) {
        return interaction.reply({
          content: "🚫 No tenés permiso para usar este comando.",
          ephemeral: true,
        });
      }

      const usuario = interaction.options.getUser("usuario");
      const razon = interaction.options.getString("razon") || "Sin razón";

      const miembro = interaction.guild.members.cache.get(usuario.id);
      if (!miembro)
        return interaction.reply({
          content: "❌ No se pudo encontrar al usuario.",
          ephemeral: true,
        });

      await miembro.kick(razon);
      await interaction.reply(
        `👢 ${usuario.tag} fue expulsado. Razón: ${razon}`
      );
      break;
    }

    case "mute": {
      if (!interaction.member.permissions.has("ModerateMembers")) {
        return interaction.reply({
          content: "🚫 No tenés permisos para silenciar usuarios.",
          ephemeral: true,
        });
      }

      const usuario = interaction.options.getUser("usuario");
      const razon = interaction.options.getString("razon") || "Sin razón";
      const miembro = interaction.guild.members.cache.get(usuario.id);

      const mutedRole = interaction.guild.roles.cache.find(
        (r) => r.name === "Muted"
      );
      if (!mutedRole)
        return interaction.reply({
          content: "❌ No encontré un rol llamado `Muted`.",
          ephemeral: true,
        });

      if (!miembro)
        return interaction.reply({
          content: "❌ Usuario no encontrado.",
          ephemeral: true,
        });

      await miembro.roles.add(mutedRole);
      await interaction.reply(
        `🔇 ${usuario.tag} fue silenciado. Razón: ${razon}`
      );
      break;
    }

    case "unmute": {
      if (!interaction.member.permissions.has("ModerateMembers")) {
        return interaction.reply({
          content: "🚫 No tenés permisos para desmutear.",
          ephemeral: true,
        });
      }

      const usuario = interaction.options.getUser("usuario");
      const miembro = interaction.guild.members.cache.get(usuario.id);

      const mutedRole = interaction.guild.roles.cache.find(
        (r) => r.name === "Muted"
      );
      if (!mutedRole)
        return interaction.reply({
          content: "❌ No encontré un rol llamado `Muted`.",
          ephemeral: true,
        });

      if (!miembro)
        return interaction.reply({
          content: "❌ Usuario no encontrado.",
          ephemeral: true,
        });

      await miembro.roles.remove(mutedRole);
      await interaction.reply(`🔊 ${usuario.tag} ya no está silenciado.`);
      break;
    }

    case "warn": {
      if (!interaction.member.permissions.has("KickMembers")) {
        return interaction.reply({
          content: "🚫 No tenés permisos para advertir.",
          ephemeral: true,
        });
      }

      const usuario = interaction.options.getUser("usuario");
      const razon = interaction.options.getString("razon") || "Sin razón";

      await interaction.reply(
        `⚠️ ${usuario.tag} fue advertido. Razón: ${razon}`
      );
      try {
        await usuario.send(
          `⚠️ Recibiste una advertencia en ${interaction.guild.name}: ${razon}`
        );
      } catch {
        // No se pudo enviar DM
      }
      break;
    }
    case "contribuir":
      return interaction.reply({
        content: `
              ** 💻  Pasos para comenzar:** \n 1. Ingresa a el repositorio en github del proyecto   [Repositorio de bitbot](https://github.com/TeewsPepper/bitbot).\n 2. Te recomentando comienza leyendo el readme.md que encontrarar en la parte final de repositorio.\n3. Crear un fork de este repositorio en tu cuenta de github despues una rama personalizada con los cambios que quieres realizar.\n4. Finaliza con un pull request de esto cambios una vez ya funciones de manera correcta.
            `,
        ephemeral: true, // ✔️ ESTA ES LA FORMA CORRECTA
      });
  }
});

// Evento: Respuesta cuando mencionan al bot
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.mentions.has(client.user)) {
    message.reply({
      content:
        "¡Hola! 👋 Usa el comando `/ayuda` para ver las instrucciones de registro.",
      allowedMentions: { repliedUser: false },
    });
  }
});
client.login(process.env.DISCORD_TOKEN);
