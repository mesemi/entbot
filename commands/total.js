module.exports = {
	name: 'total',
	description: 'Shows total repairsS!',
	async execute(interaction) {
        var data = require('./data.json');
		var daReq = interaction.user.id;

        if (!data.users[daReq]) { // incase there is no data present, make some.
            data.users[daReq] = {
                "hydrants": 0,
                "turbines": 0
            }
        }

        await interaction.reply({content: "You have repaired " + data.users[daReq].hydrants + " hydrants and " + data.users[daReq].turbines + " turbines.", ephemeral: true});
	},
};