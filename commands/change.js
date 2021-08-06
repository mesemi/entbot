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
		var data = require('./data.json');
		const daMention = interaction.options.getString("daMention");
		const daChange = interaction.options.getString("daChange");
		const daValue = interaction.options.getInteger("daValue");
		console.log(daMention, daChange, daValue);
	},
};