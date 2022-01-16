const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('total')
    .setDescription('Shows total repairs.')
    .addUserOption(option =>
          option.setName('user')
                .setDescription('User being checked.')),
	async execute(client, interaction) {
        var data = require('/app/data/json/data.json');
		    var daReq = interaction.user.id;
        var theRequest = interaction.options.getUser('user');

        if (!data.users[daReq]) { // incase there is no data present, make some.
            data.users[daReq] = {
                "hydrants": 0,
                "turbines": 0
            }
        }
        if (!theRequest) {
          await interaction.reply({content: "You have repaired " + data.users[daReq].hydrants + " hydrants and " + data.users[daReq].turbines + " turbines.", ephemeral: true});
        } else {
            if (!data.users[theRequest.id]) { // incase there is no data present, make some.
              data.users[theRequest.id] = {
                  "hydrants": 0,
                  "turbines": 0
              }
          }
            if (interaction.member.id === theRequest.id) {
              await interaction.reply({content: "You have repaired " + data.users[daReq].hydrants + " hydrants and " + data.users[daReq].turbines + " turbines.", ephemeral: true});
            } else if (interaction.channel.name === 'admin-perms') {
              interaction.reply({content: "<@" + theRequest.id + "> has repaired " + data.users[theRequest.id].hydrants + " hydrants and " + data.users[theRequest.id].turbines + " turbines.", ephemeral: true})
            } else {
              interaction.reply({content: "Insufficent permissions.", ephemeral: true});
          }
        }
	},
};