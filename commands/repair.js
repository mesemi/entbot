module.exports = {
	name: 'repair',
	description: 'Replies with Pong!',
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};