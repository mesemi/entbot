module.exports = {
	name: 'change',
	description: 'Replies with Pong!',
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};