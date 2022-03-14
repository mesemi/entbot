const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');
client.commands = new Collection();
client.buttons = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));
const dataFiles = fs.readdirSync('./.data').filter(file => file.endsWith('.json'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
for (const file of buttonFiles) {
	const button = require(`./buttons/${file}`);
	client.buttons.set(button.name, button);
}

/*
Discord bot made for Civilous' SCPF Engineering & Technical Services Department by mesemi#0758 (with help from Neostant#9194)
*/

client.once('ready', () => {
	console.log(`[E&T Bot] Logged in! ✔️`);
	console.log(`[ScD Bot] Currently registered data files: ` + dataFiles)
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
  console.log("occured");
  delete data.users[member.id]
  fs.writeFile('/app/.data/data.json', JSON.stringify(data), function (err) { if (err) throw err;});
})


client.login(process.env.TOKEN);
