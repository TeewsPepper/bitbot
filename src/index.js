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

  if (interaction.commandName === "ayuda") {
    await interaction.reply({
      content:
        "**📌 Pasos para registrarte:**\n1. Verifica tu email\n2. Completa tu perfil con `/perfil`\n3. ¡Listo!",
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
