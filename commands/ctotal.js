module.exports = {
	name: 'ctotal',
	description: 'Checks total of user.',
	options: [
		{
		name: 'dareq',
		type: "USER",
		description: "The user to check the total of.",
		required: true,
		}
	],
	async execute(interaction) {

		if (interaction.channel.name === 'admin-perms') {

			var data = require('./data.json');

			const daReqs = interaction.options.getUser('dareq');

			interaction.reply({content: "<@" + daReqs + "> has repaired " + data.users[daReqs.id].hydrants + " hydrants and " + data.users[daReqs.id].turbines + " turbines.", ephemeral: true})

		} else {
			interaction.reply({content: "Insufficent permissions.", ephemeral: true});
		}
	},
};