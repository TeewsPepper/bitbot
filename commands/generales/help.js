const help = async (interaction) => {
	await interaction.reply({
		content: '**📌 Pasos para registrarte:**\n1. Verificá tu email\n2. Completá tu perfil con `/perfil`\n3. ¡Listo!',
		flags: 64,
	})
}

export default help