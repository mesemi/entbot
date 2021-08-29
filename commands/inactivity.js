module.exports = {
	name: 'inactivity',
	description: 'Registers your inactivity.',
    options: [
        {
            name: 'request',
            description: 'Start or end an inactivity notice.',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'start',
                    value: 'start',
                },
                {
                    name: 'end',
                    value: 'end',
                },
            ],
        },
        {
            name: 'enddate',
            description: 'Provide an ending date for inactivity.',
            type: 'STRING',
        },
        {
            name: 'reason',
            description: 'Provide a reason for starting inactivity',
            type: 'STRING',
        }
    ],
	async execute(interaction) {
        const fs = require('fs');
        const inactivities = require('./inactivity.json');
        const request = interaction.options.getString("request");
        const enddate = interaction.options.getString("enddate");
        const reason = interaction.options.getString("reason");
        const playa = interaction.user.id;
        const { MessageEmbed } = require('discord.js');
        const index = require('/app/index.js');
        function saveDatai() {
            fs.writeFile('./commands/inactivity.json', JSON.stringify(inactivities), function (err) { 
                if (err) throw err;
            });
        }
        const startEmbed = new MessageEmbed()
            .setColor('#ffcf05')
            .setTitle(interaction.member.displayName + "'s inactivity Notice")
            .setDescription('Reason for Inactivity: ' + reason)
            .addFields(
                { name: 'Start date:', value: interaction.createdAt.toDateString() + ' ', inline: true, },
                { name: 'End date:', value: enddate + ' ', inline: true },
            )
            .setTimestamp()
        const endEmbed = new MessageEmbed()
            .setColor('#ff8100')
            .setTitle(interaction.member.displayName + "'s inactivity has ended.")
            .setTimestamp()
        if (interaction.channel !== index.channel){
            await interaction.reply({content: "Wrong channel.", ephemeral: true});
            return;
        } else {
            if (request == 'start') {
                if (inactivities.inactivities[playa] == 1) {
                    await interaction.reply({content: "You already have a inactivity notice active!", ephemeral: true,});
                    return;
                } else {
                    if (!enddate || !reason) {
                        await interaction.reply({content: "Missing arguments.", ephemeral: true});
                    } else {
                        inactivities.inactivities[playa] = 1
                        saveDatai();
                        const role = interaction.guild.roles.cache.get('582497026877423617');
                        interaction.member.roles.add(role);
                        await interaction.reply({ embeds: [startEmbed] });
                    }
                }
            } else {
                if (inactivities.inactivities[playa] !== 0) {
                    inactivities.inactivities[playa] = 0;
                    saveDatai();
                    await interaction.reply({ embeds: [endEmbed] });
                } else {
                    await interaction.reply({content: "No inactivity to end.", ephemeral: true});
                }
            }
        }
	},
};