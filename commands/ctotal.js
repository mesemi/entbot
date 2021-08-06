module.exports = {
	name: 'ctotal',
	description: 'Checks total of user.',
	options: [
		{
		name: 'daReq',
		type: "USER",
		description: "The user to check the total of.",
		required: true,
		}
	],
	async execute(interaction) {
		var data = require('./data.json');

		const daReqs = interaction.options.getString('daReq');

		interaction.reply("<@" + daReqs + "> has repaired " + data.users[daReqs].hydrants + " hydrants and " + data.users[daReqs].turbines + " turbines.")


		console.log("ctotal command sent by " + message.author.username);
            if (checkAdmin()){
                console.log('ctotal successfully sent');
                if (arg1 != null){ // the same stupid check
                    if (arg1.startsWith('<')) {
                        var arg5 = arg1.slice(3, -1);
                    } else {
                        var arg5 = arg1
                    }
                    message.channel.send("<@" + arg5 + "> has repaired " + data.users[arg5].hydrants + " hydrants and " + data.users[arg5].turbines + " turbines.")

                } else {
                    message.reply("Missing arguments.");

                }
            } else {
                message.reply("Insufficient permissions.");

            }
	},
};