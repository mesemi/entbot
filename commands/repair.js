module.exports = {
	name: 'repair',
	description: 'Adds a repair.',
	options: [{
		name: 'repair',
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
	}],
	async execute(interaction) {
		var data = require('./data.json');
		var daReq = interaction.user.id;

		if (!data.users[daReq]) {
			data.users[daReq] = {
				"hydrants": 0,
				"turbines": 0
			}
		}

		const repairthingy = interaction.options.getString('repair');
		data.users[daReq][repairthingy] += 1
		interaction.reply({content: 'You have repaired a ' + repairthingy.splice(0, -1) + '. Your new total is ' + data.users[daReq][repairthingy] + '.', ephemeral: true});
		
	},
};