const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('apply')
		.setDescription('Starts the E&T application.')
		.addStringOption(option =>
				option.setName("test")
							.setDescription("test")
							.setRequired(true)),
	async execute(client, interaction) {
		const { MessageEmbed } = require('discord.js');
		const test = interaction.options.getString("test")

		const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('appaccept')
						.setLabel('Accept')
						.setStyle('SUCCESS'),
					new MessageButton()
						.setCustomId('appdeny')
						.setLabel('Deny')
						.setStyle('DANGER')
				);

				const theEmbed = new MessageEmbed()
						.setColor('#233287')
						.setTitle(interaction.member.displayName + "'s Application")
						.setAuthor(interaction.member.displayName, interaction.user.avatarURL())
						.setDescription(test)
						.setTimestamp()

				interaction.reply({ embeds: [theEmbed], components: [row] })


	},
};
