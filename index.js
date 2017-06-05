const Commando = require("discord.js-commando");

const client = new Commando.Client({
    owner: '<OWNER_ID_HERE>'
});

client.on('ready', () => {
	client.user.setGame('!help for help');
	console.log(`Logged in as ${client.user.username}!`);
});

/* Command & command groups registry
============================================================*/
client.registry.registerGroups([
    ['mod', 'Moderation'],
    ['music', 'Music'],
    ['fun', 'Fun']
]);

// Registers all built-in groups, commands, and argument types
client.registry.registerDefaults()

// Registers all of your commands in the ./commands directory
client.registry.registerCommandsIn(__dirname + '/commands');


client.login('<SECRET_HERE>');