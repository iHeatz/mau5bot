const Commando = require("discord.js-commando");

class CleanCommand extends Commando.Command {
    
    constructor(client) {
        super(client, {
            name: 'clean',
            group: 'mod',
            memberName: 'clean',
            description: 'Cleans x bot messages',
            format: '[number_of_messages]',
            details: 'Deletes messages that start with the prefix. If you provide the optional argument, number_of_messages, this command will only delete the specified amount of bot messages.',
            
            args: [
				{
					key: 'number_of_messages',
					prompt: 'How many bot messages do you wish to delete?',
					type: 'integer',
					default: ''
				}
			]
        
        });
    }
    
    async run(message, {number_of_messages}) {
		
		// TODO: Switch for-loop with smart search so that it doesn't iterate through all messages in channel
		message.channel.fetchMessages()
		 .then(function (messages) {
			messages = Array.from(messages);
			const length = messages.length;
			if (number_of_messages) { var nmessages = 0; } else { var nmessages = -1; }
			
			for(var i = 0; i < length; i++) {
				if (nmessages !== -1 && nmessages !== number_of_messages + 1) {
					if (messages[i][1].content.startsWith(message.guild.commandPrefix)
						|| (messages[i][1].author.id === '<BOT_ID_HERE>' && messages[i][1].isMentioned(message.author))) {
						messages[i][1].delete();
						nmessages++;
					}
				}
			}
		 })
		 .catch(err => console.log(err));
		
    }
    
}

module.exports = CleanCommand;