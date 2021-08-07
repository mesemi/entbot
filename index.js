const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');
var token = require('./token.json');
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.application?.commands.set([]);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    //const tents = client.commands.set(command.name, command);
	console.log(command);
	//console.log(tents);
}

/*
Discord bot made for Civilous' SCPF Engineering & Technical Services Department by mesemi#0758 (with help from Neostant#9194)
*/

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.guilds.cache.forEach(guild => {
		console.log(`${guild.name} | ${guild.id}`);
    })
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (!client.commands.has(interaction.commandName)) return;

	try {
		await client.commands.get(interaction.commandName).execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.login(token.token);