const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

/*
Discord bot made for Civilous' SCPF Engineering & Technical Services Department by mesemi#0758 (with help from Neostant#9194)
*/

client.once('ready', () => {
	console.log(`[E&T Bot] Logged in! ✔️`);
});


client.on('interactionCreate', async interaction => {

	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(client, interaction);
	} catch (error) {
    console.log('[E&T Bot] There was an error while trying to execute ' + interaction.commandName + ' ❌')
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('guildMemberRemove', async member => {
  var data = require('/app/.data/data.json')
  console.log("occured")
  data.users[member.id] = {
					"hydrants": 0,
					"turbines": 0
	}
  console.log(data.users[member.id])
  fs.writeFile('/app/.data/data.json', JSON.stringify(data), function (err) { if (err) throw err;});
})


client.login(process.env.TOKEN);
