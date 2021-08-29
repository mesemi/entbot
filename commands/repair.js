module.exports = {
	name: 'repair',
	description: 'Adds a repair.',
	options: [
		{
		name: 'item',
		description: 'Item repaired',
		type: 'STRING',
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
		],
		}
	],
	async execute(interaction) {
		const fs = require('fs');
		function saveData() {
			fs.writeFile('./commands/data.json', JSON.stringify(data), function (err) { 
				if (err) throw err;
			});
		}

		var data = require('./data.json');
		var daReq = interaction.user.id;

		if (!data.users[daReq]) {
			data.users[daReq] = {
				"hydrants": 0,
				"turbines": 0
			}
		}

		const repairthingy = interaction.options.getString('item');
		data.users[daReq][repairthingy] += 1
		saveData();
		interaction.reply({content: 'You have repaired a ' + repairthingy.slice(0, -1) + '. Your new total is ' + data.users[daReq][repairthingy] + '.', ephemeral: true});
		
	},
};
