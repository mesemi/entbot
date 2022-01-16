const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('repair')
    .setDescription('Adds a repair.')
    .addStringOption(option =>
        option.setName('item')
              .setDescription('Item repaired')
              .setRequired(true)
              .addChoice('Hydrant', 'hydrants')
              .addChoice('Turbine', 'turbines')),
	async execute(client, interaction) {
		const fs = require('fs');
		function saveData() {
			fs.writeFile('/app/data/json/data.json', JSON.stringify(data), function (err) { 
				if (err) throw err;
			});
		}

		var data = require('/app/data/json/data.json');
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
