module.exports = {
	name: 'ctotal',
	description: 'Checks total of user.',
	options: [
		{
		name: 'daReq',
		type: "USER",
		description: "The user to check the total of.",
		required: true,
		}
	],
	async execute(interaction) {

		if (!interaction.user.roles.cache.has('870461579106320424') || !interaction.channel.name === 'admin-perms') { interaction.reply({content: "Insufficent permissions.", ephemeral: true}); return; }

		var data = require('./data.json');

		const daReqs = interaction.options.getString('daReq');

		interaction.reply({content: "<@" + daReqs + "> has repaired " + data.users[daReqs].hydrants + " hydrants and " + data.users[daReqs].turbines + " turbines.", ephemeral: true})

	},
};