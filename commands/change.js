module.exports = {
	name: 'change',
	description: 'Changes values of other users.',
	options: [
		{
			name: "daMention",
			description: "User being changed.",
			type: "USER",
			required: true,
		},
		{
			name: "daChange",
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
			name: "daValue",
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
		const daMention = interaction.options.getString("daMention");
		const daChange = interaction.options.getString("daChange");
		const daValue = interaction.options.getInteger("daValue");
		console.log(daMention, daChange, daValue);

		if (!interaction.user.roles.cache.has('870461579106320424') || !interaction.channel.name === 'admin-perms') { interaction.reply({content: "Insufficent permissions.", ephemeral: true}); return; }

		if (!data.users[daMention]) {
			data.users[daMention] = {
				"hydrants": 0,
				"turbines": 0
			}
		}

		data.users[daMention][daMention] = daValue;
		saveData();
		interaction.reply({content: "The " + daChange + " repaired for <@" + daMention + "> has been changed to " + daValue, ephemeral: true});
	},
};