module.exports = {
	name: 'change',
	description: 'Changes values of other users.',
	options: [
		{
			name: "damention",
			description: "User being changed.",
			type: "USER",
			required: true,
		},
		{
			name: "dachange",
			description: "Item being changed.",
			type: "STRING",
			required: true,
			choices: [
				{
					name: 'Hydrant',
					value: 'hydrants',
				},
				{
					name: "Turbine",
					value: "turbines",
				},
			]
		},
		{
			name: "davalue",
			description: "Value the item is being changed to.",
			type: "INTEGER",
			required: true,
		}
	],
	async execute(interaction) {
		const fs = require('fs');
		function saveData() {
			fs.writeFile('data.json', JSON.stringify(data), function (err) { 
				if (err) throw err;
			});
		}
		var data = require('./data.json');
		const daMention = interaction.options.getUser("damention");
		const daChange = interaction.options.getString("dachange");
		const daValue = interaction.options.getInteger("davalue");
		console.log(daMention, daChange, daValue);

		//daRolez = guild.member.fetch(daMention)

		if (interaction.channel.name === 'admin-perms') {

			if (!data.users[daMention.id]) {
				data.users[daMention.id] = {
					"hydrants": 0,
					"turbines": 0
				}
			}

			data.users[daMention.id][daChange] = daValue;
			saveData();
			interaction.reply({content: "The " + daChange + " repaired for <@" + daMention + "> has been changed to " + daValue, ephemeral: true});
		} else {
			interaction.reply({content: "Insufficent permissions.", ephemeral: true}); return;
		};
	},
};