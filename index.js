const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
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


/*  Litterally just holding this there becasue i am too lazy t ofigure out the new way to register commands
client.on('messageCreate', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner.id) {
		const data = [
			{
				name: 'ping',
				description: 'Replies with Pong!',
			},
			{
				name: 'repair',
				description: 'Adds a repair.',
				options: [
					{
						name: 'item',
						description: 'Item repaired',
						type: 'STRING',
						required: true,
						choices: [
							{
								name: 'Hydrant',
								value: 'hydrants',
							},
							{
								name: "Turbine",
								value: "turbines",
							},
						],
					},
				],
			},
			{
				name: 'total',
				description: 'Shows total repairs!'
			},
			{
				name: 'admintotal',
				description: "Replies with total of all users."
			},
			{
				name: 'change',
				description: 'Changes a users data.',
				options: [
					{
						name: "damention",
						description: "User being changed.",
						type: "USER",
						required: true,
					},
					{
						name: "dachange",
						description: "Item being changed.",
						type: "STRING",
						required: true,
						choices: [
							{
								name: 'Hydrant',
								value: 'hydrants',
							},
							{
								name: "Turbine",
								value: "turbines",
							},
						]
					},
					{
						name: "davalue",
						description: "What are you changing their total to?",
						type: "INTEGER",
						required: true,
					}
				],
			},
			{
				name: 'ctotal',
				description: 'Checks total of user.',
				options: [
					{
					name: 'dareq',
					type: "USER",
					description: "The user to check the total of.",
					required: true,
					}
				],
			},
			{
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
				]
			}
		];

		const command = await client.application?.commands.set(data);
	}
});
*/

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (!client.commands.has(interaction.commandName)) return;

	const channel = await client.channels.cache.get('873679854506221579');
	module.exports = {
		channel,
	}

	try {
		await client.commands.get(interaction.commandName).execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.login(process.env.TOKEN);