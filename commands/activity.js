const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('activity')
        .setDescription('Registers your activity.')
        .addStringOption(option =>
            option.setName('request')
                  .setDescription('Start or end an activity period.')
                  .setRequired(true)
                  .addChoice('start', 'start')
                  .addChoice('end', 'end')),
	async execute(client, interaction) {
        const fs = require('fs');
        const activities = require('/app/.data/activity.json');
        const request = interaction.options.getString("request");
        const playa = interaction.user.id;
        const { MessageEmbed } = require('discord.js');
        function saveDatai() {
            fs.writeFile('/app/.data/activity.json', JSON.stringify(activities), function (err) {
                if (err) throw err;
            });
        }
        const thePlace = client.channels.cache.get('896924118916685824')
            if (request == 'start') {
                if (!activities.activity[playa] || activities.activity[playa] == 0) {
                    let ending = "Currently active!"
                    const NOW = Math.floor(Date.now() / 1000)
                    const startEmbed = new MessageEmbed()
                        .setColor('#ffcf05')
                        .setTitle(interaction.member.displayName + "'s activity log")
                        .addFields(
                            { name: 'Start time:', value: "<t:" + NOW + ":t>" + ' ', inline: true, },
                            { name: 'End time:', value: ending + ' ', inline: true },
                        )
                        .setTimestamp()
                    const thething = await thePlace.send({ embeds: [startEmbed] });
                    activities.activity[playa] = {"a": thething.id, "b": NOW}
                    saveDatai();
                    interaction.reply({content: "Activity started.", ephemeral: true})
                } else {
                    if (activities.activity[playa] !== 0){
                        await interaction.reply({content: "You already have a activity log active!", ephemeral: true,});
                        return;
                    } else {
                      await interaction.reply({content: "Dont know what happened. Ask mesemi.", ephemeral: true,})
                      return;
                    }
                }
            } else {
                if (activities.activity[playa] !== 0) {
                    const NOW = Math.floor(Date.now() / 1000)
                    const fasty = activities.activity[playa].b
                    const dathingy = await thePlace.messages.fetch(activities.activity[playa].a)
                    const startEmbed = new MessageEmbed()
                        .setColor('#ff8100')
                        .setTitle(interaction.member.displayName + "'s activity log")
                        .addFields(
                            { name: 'Start time:', value: "<t:" + fasty + ":t>" + ' ', inline: true, },
                            { name: 'End time:', value: "<t:" + NOW + ":t>"+ ' ', inline: true },
                            { name: 'Total time:', value: Math.floor((NOW - fasty) / 60) + " minutes", inline: true}
                        )
                        .setTimestamp()
                    dathingy.edit({embeds: [startEmbed]})
                    activities.activity[playa] = 0;
                    saveDatai();
                    interaction.reply({content: "Activity ended.", ephemeral: true})
                } else {
                    await interaction.reply({content: "No activity to end.", ephemeral: true});
                }
            }
	},
};
