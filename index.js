import 'dotenv/config'
import fs  from 'fs';
import path from 'path';
import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  PermissionsBitField,
} from 'discord.js';
import help from './commands/generales/help.js';
import ban from './commands/moderacion/ban.js';



const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

// ─── Función de verificación ──────────────────────────────
async function verifyUser(member) {
  const dbPath = process.env.USERS_DATA_PATH;
  if (!dbPath) return console.error('❌ Falta USERS_DATA_PATH en el .env');

  let data;
  try {
    const raw = fs.readFileSync(path.resolve(dbPath), 'utf-8');
    data = JSON.parse(raw);
  } catch (e) {
    console.error('❌ Error al leer la base de datos de usuarios:', e);
    return;
  }

  if (!data || !Array.isArray(data.users)) {
    console.error('❌ El archivo dataUser.json no tiene el formato correcto.');
    return;
  }

  const user = data.users.find(
    u => u.username.toLowerCase() === member.user.username.toLowerCase()
  );
const register = process.env.REGISTER_URL;
  if (!user) {
    try {
      await member.send('🚫 No estás registrado aún. Por favor registrate en la plataforma. '+ register);
    } catch {}
    return;
  }

  const channel = member.guild.channels.cache.find(c => c.name === user.group);
  if (!channel) return console.warn(`⚠️ Canal "${user.group}" no encontrado.`);

  try {
    await channel.permissionOverwrites.edit(member.id, {
      ViewChannel: true,
      SendMessages: true,
      ReadMessageHistory: true,
    });

    await member.send(`✅ Acceso otorgado al canal **#${channel.name}** según tu grupo.`);
  } catch (err) {
    console.error('❌ Error al asignar permisos:', err);
  }
}

// ─── Bienvenida al entrar ──────────────────────────────
client.on('guildMemberAdd', async member => {
  const welcomeChannel = member.guild.channels.cache.get(process.env.CANAL_BIENVENIDA_ID);

  if (welcomeChannel) {
    welcomeChannel.send(`¡Bienvenido ${member.user.username} al servidor! 🎉\nUsa \`/ayuda\` para comenzar.`);
  }

  try {
    await member.send('¡Bienvenido! Escribí `/ayuda` para guiarte en el registro.');
  } catch {}

  await verifyUser(member);
});

// ─── Comandos Slash ──────────────────────────────
const commands = [
  {
    name: 'ayuda',
    description: 'Muestra la ayuda para el registro',
  },
  {
    name: 'perfil',
    description: 'Muestra tu perfil básico',
  },
  {
    name: 'reglas',
    description: 'Muestra las reglas del servidor',
  },
  {
    name: 'info',
    description: 'Muestra información del servidor',
  },
  {
    name: 'ping',
    description: 'Muestra la latencia del bot',
  },
  {
    name: 'verificar',
    description: 'Verifica tu usuario o el de otro miembro (admins)',
    options: [
      {
        name: 'usuario',
        description: 'El usuario a verificar',
        type: 6, // USER
        required: false,
      },
    ],
  },
  {
    name: 'ban',
    description: 'Banea a un usuario',
    options: [
      { name: 'usuario', type: 6, description: 'Usuario a banear', required: true },
      { name: 'razon', type: 3, description: 'Razón del baneo', required: false },
    ],
  },
  {
    name: 'kick',
    description: 'Expulsa a un usuario',
    options: [
      { name: 'usuario', type: 6, description: 'Usuario a expulsar', required: true },
      { name: 'razon', type: 3, description: 'Razón de la expulsión', required: false },
    ],
  },
  {
    name: 'mute',
    description: 'Silencia a un usuario',
    options: [
      { name: 'usuario', type: 6, description: 'Usuario a silenciar', required: true },
      { name: 'razon', type: 3, description: 'Razón del muteo', required: false },
    ],
  },
  {
    name: 'unmute',
    description: 'Des-silencia a un usuario',
    options: [
      { name: 'usuario', type: 6, description: 'Usuario a desmutear', required: true },
    ],
  },
  {
    name: 'warn',
    description: 'Advierte a un usuario',
    options: [
      { name: 'usuario', type: 6, description: 'Usuario a advertir', required: true },
      { name: 'razon', type: 3, description: 'Razón de la advertencia', required: false },
    ],
  },
];

// ─── Registro de comandos ──────────────────────────────
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.APPLICATION_ID),
      { body: commands }
    );
    console.log('🔄 Comandos de barra registrados');
  } catch (error) {
    console.error('❌ Error al registrar comandos:', error);
  }
})();

// ─── Interacciones Slash ──────────────────────────────
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, user, guild } = interaction;

  switch (commandName) {
    case 'ayuda':
      help(interaction);
      break;

    case 'perfil':
      await interaction.reply({
        content: `👤 **Perfil de ${user.username}**\n📅 Cuenta creada: <t:${Math.floor(user.createdTimestamp / 1000)}:D>\n🆔 ID: ${user.id}`,
        flags: 64,
      });
      break;

    case 'reglas':
      await interaction.reply({
        content: '**📜 Reglas del servidor:**\n1. Respeto mutuo\n2. No spam\n3. Seguir a los mods\n4. ¡Divertite! 🎉',
        flags: 64,
      });
      break;

    case 'info':
      await interaction.reply({
        content: `📊 **Info del servidor:**\n🔤 Nombre: ${guild.name}\n👥 Miembros: ${guild.memberCount}\n🆔 ID: ${guild.id}`,
        flags: 64,
      });
      break;

    case 'ping':
      await interaction.reply({
        content: `🏓 ¡Pong! Latencia: **${Date.now() - interaction.createdTimestamp}ms**`,
        flags: 64,
      });
      break;

    case 'verificar': {
      const objetive = interaction.options.getUser('usuario') || interaction.user;
      const member = interaction.guild.members.cache.get(objetive.id);

      if (objetive.id !== interaction.user.id && !interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
        return interaction.reply({ content: '🚫 No tenés permisos para verificar a otros usuarios.', flags: 64 });
      }

      await verifyUser(member);
      await interaction.reply({ content: `🔍 Verificando a ${objetive.username}...`, flags: 64 });
      break;
    }

    case 'ban':
      ban(interaction);
      break;

    case 'kick': {
      if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
        return interaction.reply({ content: '🚫 No tenés permiso para expulsar.', flags: 64 });
      }
      const user = interaction.options.getUser('usuario');
      const reason = interaction.options.getString('razon') || 'Sin razón';
      const member = interaction.guild.members.cache.get(user.id);
      if (!member) return interaction.reply({ content: '❌ Usuario no encontrado.', flags: 64 });

      await member.kick(reason);
      await interaction.reply(`👢 ${user.tag} fue expulsado. Razón: ${reason}`);
      break;
    }

    case 'mute': {
      const user = interaction.options.getUser('usuario');
      const reason = interaction.options.getString('razon') || 'Sin razón';
      const member = interaction.guild.members.cache.get(user.id);
      const mutedRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');
      if (!mutedRole || !member) return interaction.reply({ content: '❌ Rol o usuario no encontrado.', flags: 64 });

      await member.roles.add(mutedRole);
      await interaction.reply(`🔇 ${user.tag} fue silenciado. Razón: ${reason}`);
      break;
    }

    case 'unmute': {
      const user = interaction.options.getUser('usuario');
      const member = interaction.guild.members.cache.get(user.id);
      const mutedRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');
      if (!mutedRole || !member) return interaction.reply({ content: '❌ Rol o usuario no encontrado.', flags: 64 });

      await member.roles.remove(mutedRole);
      await interaction.reply(`🔊 ${user.tag} ya no está silenciado.`);
      break;
    }

    case 'warn': {
      const user = interaction.options.getUser('usuario');
      const reason = interaction.options.getString('razon') || 'Sin razón';
      await interaction.reply(`⚠️ ${user.tag} fue advertido. Razón: ${reason}`);
      try {
        await user.send(`⚠️ Recibiste una advertencia en ${interaction.guild.name}: ${reason}`);
      } catch {}
      break;
    }
  }
});

// ─── Mención directa al bot ──────────────────────────────
client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.mentions.has(client.user)) {
    message.reply({
      content: '¡Hola! 👋 Usá `/ayuda` para ver los pasos de registro.',
      allowedMentions: { repliedUser: false },
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
