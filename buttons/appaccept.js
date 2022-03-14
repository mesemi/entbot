const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs')
const appData = require('/app/.data/apps.json');


module.exports = {
  "name": "testaccept",
	async execute(client, interaction) {
    const filter = m => m.author.id.includes(interaction.member.id);
    const collector = interaction.channel.createMessageCollector({ time: 30000 });
    const swagballs = await interaction.channel.messages.fetch(interaction.message.id);

    swagballs.edit({content: "Application accepted by " + interaction.member.nickname + ' ✅', components: []})
    interaction.deferReply({ephemeral: true})
    //const channel = await client.channels.cache.get('874097034288848896');
    //const fchannel = await client.channels.cache.get('731984961480949762');

		collector.on('collect', m => {
      client.users.cache.get(appData.apps[interaction.message.id].user).send("<@" + appData.apps[interaction.message.id].user + ">, your test has been accepted by <@" + interaction.member.id + ">, with feedback: " + m.content)
      tests.test[interaction.message.id] = {}
      fs.writeFile('/app/.data/apps.json', JSON.stringify(tests), function (err) {if (err) throw err;});
      interaction.editReply("Done!")
      collector.stop();
    });
    collector.on('end', collected => {
      if (collected.size === 0) {
        if (!data.users[tests.test[interaction.message.id].user]) {
                              data.users[tests.test[interaction.message.id].user] = {
                                'testsDone': 0,
                              }
                            }
        data.users[tests.test[interaction.message.id].user].testsDone += 1
        fchannel.send("<@" + tests.test[interaction.message.id].user + ">, your test has been accepted by <@" + interaction.member.id + ">")
        tests.test[interaction.message.id] = {}
        fs.writeFile('/app/.data/tests.json', JSON.stringify(tests), function (err) {if (err) throw err;});
        fs.writeFile('/app/.data/data.json', JSON.stringify(data), function (err) {if (err) throw err;});
        interaction.editReply("Done!")
    }});
	},
};
