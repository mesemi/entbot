const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
var data = require('./data.json');
const token = require('./token.js');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.guilds.cache.forEach(guild => {
		console.log(`${guild.name} | ${guild.id}`);
	  })
});

function saveData() {
	fs.writeFile('data.json', JSON.stringify(data), function (err) { 
		if (err) throw err;
	});
}

client.on ('message', async message => {

    function checkAdmin() {
        if (message.member.roles.cache.has('870461579106320424')) {
            return true;
        } else if (message.channel.topic == 'aBcdEf154') {
            return true;
        } else {
            return false;
        }
    }

    var prefix = '!';
    if (message.content.startsWith(prefix)){
        var command = message.content.slice (prefix.length).split(" ")[0],
            arg1 = message.content.split(" ")[1];
            arg2 = message.content.split(" ")[1];
            arg3 = message.content.split(" ")[1];
    } else {
        return;
    }

    switch (command) {
        // normal commands
        case "total": //!total - show totals of hydrants/turbines | !total (hydrants/turbines) show specifics
            var daReq = message.author.id;
            console.log("Total command sent by " + message.author.username);

            if (!data.users[daReq]) {
                data.users[daReq] = {
                    "hydrants": 0,
                    "turbines": 0
                }
            }

            if (arg1 != null) { // if an argument exists, use argument to find data for specific request.
                var tData = data.users[daReq][arg1.toLowerCase()]
                if (tData != null) {
                    message.channel.send('You have ' + tData + ' ' + arg1.toLowerCase() + ' fixed.');
                } else {
                    message.channel.send("Invalid request. `" + arg1.toLowerCase() + " does not exist.`");
                }
            } else { // if no argument, show totals.
                message.channel.send("You have repaired " + data.users[daReq].hydrants + " hydrants and " + data.users[daReq].turbines + " turbines.");
            }
            break;
        case "repair": //adding +1 to hydrants/turbines if registered a repair
            var daReq = message.author.id;
            console.log('Repair command sent by' + message.author.username);

            if (!data.users[daReq]) {
                data.users[daReq] = {
                    "hydrants": 0,
                    "turbines": 0
                }
            }

            if (arg1 != null) {
                if (arg1.toLowerCase() == "Hydrant") {
                    data.users[daReq].hydrants += 1;
                    saveData()
                    message.channel.send('You have fixed a hydrant. Your total is now ' + data.users[daReq].hydrants + '.');
                } else if (arg1.toLowerCase() == "turbine") {
                    data.users[daReq].turbines += 1;
                    saveData()
                    message.channel.send('You have fixed a turbine. Your total is now ' + data.users[daReq].turbines + '.');
                } else {
                    message.channel.send("Invalid request.");
                }
            } else {
                message.channel.send("Missing arguments.");
            }
            break;
        // admin commands
        case "admintotal": // lists ALL totals
            console.log("admintotal command sent by " + message.author.username);
            if (checkAdmin()) {
                console.log("admintotal successfully sent.")
                var Content = ' here is your status report:\n\n'
                for (const [key, value] of Object.entries(data.users)) {
                    Content = Content + '<@' + key + '> has repaired `' + value.turbines + '` turbines and `' + value.hydrants + '` hydrants.\n'
                }
                message.reply(Content)
                break;
            } else {
                message.reply("Insufficient permissions.");
                break;
            }
        case "change": // changes specific values
            console.log("change command sent by " + message.author.username);
            if (checkAdmin()) {
                console.log("change successfully sent");
                if (arg1 != null && arg3 != null){
                    var arg4 = parseInt(arg3, 10);
                    if (arg1.startsWith("<")) { // stupid check to make mention and ids right probably can be cleaned
                        var arg5 = arg1.slice(3,-1);
                    } else {
                        var arg5 = arg1
                    }
                    if (!data.users[arg5]) {
                        data.users[arg5] = {
                            "hydrants": 0,
                            "turbines": 0
                        }
                    }
                    data.users[arg5][arg2.toLowerCase()] = arg4;
                    saveData();
                    message.channel.send("The " + arg2 + " repaired for <@" + arg5 + "> has been changed to " + arg4);
                } else {
                    message.reply("Missing arguments.");
                }
            } else {
                message.reply("Insufficient permissions.");
            }
        case 'ctotal': // checks specific user's totals
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
                    break;
                } else {
                    message.reply("Missing arguments.");
                    break;
                }
            } else {
                message.reply("Insufficient permissions.");
                break;
            }
        //misc commands
        case 'ping':
            console.log('ping command sent by ' + message.author.username);
            message.channel.send('pong!');
            break;
        case 'help':
            console.log("Help command sent by " + message.author.username);
            var help = 'Use !repair (hydrant/turbine) to add to your total; use !total to view your total. '
            if (checkAdmin()){
                console.log("Help command provided with admin.")
                help += "You have administrator permissions! You can use !admintotal to view all stored users, !ctotal (user) to view a specific user's data, and !change (user) (hydrants/turbines) (value) to change set values."
            } else {
                message.channel.send(help);
                break;
            }
            message.channel.send(help);
            break;
    }

})





client.login(token);