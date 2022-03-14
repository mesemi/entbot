const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs')
const appData = require('/app/.data/apps.json');


module.exports = {
  "name": "testaccept",
	async execute(client, interaction) {
    const theGuy = appData.apps[interaction.message.id].user
    const filter = m => m.author.id.includes(interaction.member.id);
    const collector = interaction.channel.createMessageCollector({ time: 30000 });
    const swagballs = await interaction.channel.messages.fetch(interaction.message.id);

    swagballs.edit({content: "Application accepted by " + interaction.member.nickname + ' ✅', components: []})
    interaction.deferReply({ephemeral: true})
    //const channel = await client.channels.cache.get('874097034288848896');
    //const fchannel = await client.channels.cache.get('731984961480949762');

		collector.on('collect', m => {
      client.users.cache.get(theGuy).send("<@" + theGuy + ">, your test has been accepted by <@" + interaction.member.id + ">, with feedback: " + m.content)
      appData.apps[interaction.message.id] = {"user": theGuy, "status": 2}
      fs.writeFile('/app/.data/apps.json', JSON.stringify(tests), function (err) {if (err) throw err;});
      interaction.editReply("Done!")
      collector.stop();
    });
    collector.on('end', collected => {
      if (collected.size === 0) {
        client.users.cache.get(theGuy).send("<@" + theGuy + ">, your application has been accepted by <@" + interaction.member.id + ">")
        appData.apps[interaction.message.id] = {"user": theGuy, "status": 2}
        fs.writeFile('/app/.data/apps.json', JSON.stringify(tests), function (err) {if (err) throw err;});
        interaction.editReply("Done!")
    }});
	},
};
