module.exports = {
	name: 'ctotal',
	description: 'Replies with Pong!',
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};