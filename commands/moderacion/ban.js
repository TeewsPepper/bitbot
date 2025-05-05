import { PermissionsBitField } from "discord.js";

const ban = async (interaction) => {
	if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
		return interaction.reply({ content: '🚫 No tenés permiso para banear.', flags: 64 });
	}
	const user = interaction.options.getUser('usuario');	
	const reason = interaction.options.getString('razon') || 'Sin razón';
	const member = interaction.guild.members.cache.get(user.id);
	
	if (!member) return interaction.reply({ content: '❌ Usuario no encontrado.', flags: 64 });
	try {
		await member.ban({ reason: reason });		
		await interaction.reply(`🔨 ${user.tag} fue baneado. Razón: ${reason}`);
	} catch(e) {
		console.log(e);
	}
}

export default ban