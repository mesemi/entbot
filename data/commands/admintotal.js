const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
          .setName('admintotal')
          .setDescription('Replies with total of all users.'),
	async execute(client, interaction) {
		var data = require('/app/data/json/data.json');
		if (interaction.channel.name === 'admin-perms') {
			var Content = 'Here is your status report:\n\n'
			for (const [key, value] of Object.entries(data.users)) {
				Content = Content + '<@' + key + '> has repaired `' + value.turbines + '` turbines and `' + value.hydrants + '` hydrants.\n'
			}
			interaction.reply({content: Content, ephemeral: true})
		} else {
			interaction.reply({content: "Insufficient permissions.", ephemeral: true});
		}
	},
};