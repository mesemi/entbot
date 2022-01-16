const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
          .setName('change')
          .setDescription('Changes values of other users.')
          .addUserOption(option =>
            option.setName('damention')
                  .setDescription('User being changed.')
                  .setRequired(true))
          .addStringOption(option =>
            option.setName('dachange')
                  .setDescription('Item being changed.')
                  .setRequired(true)
                  .addChoice('Hydrant', 'hydrants')
                  .addChoice('Turbine', 'turbines'))
          .addIntegerOption(option =>
            option.setName('davalue')
                  .setDescription('Value the item is being changed to.')
                  .setRequired(true)),
	async execute(client, interaction) {
		const fs = require('fs');
		function saveData() {fs.writeFile('/app/data/json/data.json', JSON.stringify(data), function (err) { if (err) throw err;});}
		var data = require('/app/data/json/data.json');
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
			fs.writeFile('/app/data/json/data.json', JSON.stringify(data), function (err) { if (err) throw err;});
			interaction.reply({content: "The " + daChange + " repaired for <@" + daMention + "> has been changed to " + daValue, ephemeral: true});
		} else {
			interaction.reply({content: "Insufficent permissions.", ephemeral: true}); return;
		};
	},
};