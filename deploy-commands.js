const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [];
const commandFiles = fs.readdirSync('./data/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./data/commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands("870319241746853950", "496762433998815270"), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);