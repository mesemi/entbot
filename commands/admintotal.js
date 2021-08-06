module.exports = {
	name: 'admintotal',
	description: 'Replies with Pong!',
	async execute(interaction) {
		var data = require('./data.json');
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