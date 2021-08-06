module.exports = {
	name: 'total',
	description: 'Replies with Pong!',
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};