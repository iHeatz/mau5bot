const Commando = require("discord.js-commando");

class MoveCommand extends Commando.Command {
    
    constructor(client) {
        super(client, {
            name: 'move',
            group: 'mod',
            memberName: 'move',
            description: 'Moves a specific message to another channel',
            format: '<message_id> <channel_name>',
            details: 'To use this command, you must provide the message ID and the channel name.',
            
            args: [
				{
					key: 'message_id',
					prompt: 'Which message do you wish to move?\n',
					type: 'string',
					validate: async message_id => {
						
						const regex = '[0-9]{18}';
						var search = message_id.search(regex);
                        if (message_id === 'last' || (search !== -1 && search === 0)) {
                            return true;
                        }
						
                        return ` The provided message_id is invalid. Please insert a valid message_id.\n `;
					}
				},
				{
					key: 'channel_name',
					prompt: 'To what channel do you wish to move this message?',
					type: 'string',
					validate: async channel_name => {
						
						const regex = '<#[0-9]{18}>';
						var search = channel_name.search(regex);
						if (search !== -1 && search === 0) {
							return true;
						}

						return ` The provided channel_name is invalid. Please insert a valid channel_name.\n `;
					}
				}
			]
        
        });
    }
    
    async run(message, {message_id, channel_name}) {
		
		
		var msg_id = -1;
		message.channel.fetchMessages()
		 .then(function (messages) {
			var msgList = Array.from(messages.keys());
			if (message_id === 'last') {
				msg_id = msgList[1];
			} else {
				msg_id = message_id;
			}

			var messageToMove;
			message.channel.fetchMessage(msg_id)
				.then(function (message) {
					messageToMove = message;

					if (messageToMove) {
						message.guild.channels.forEach( function (channel) {
							if (channel.id === channel_name.substr(2, channel_name.length - 3)) {
								
								var filesToAttach = [];
								messageToMove.attachments.forEach( function(attachment) {
									var file = {
										attachment: attachment.url,
										name: attachment.filename
									};
									filesToAttach.push(file);
								});
								
								channel.send('`[' + messageToMove.createdAt.toLocaleString() + ']`' + ' | '
											 + '`Posted by: ' + messageToMove.author.username + '`\n'
											 + messageToMove.content, {files: filesToAttach})
									.then(message.delete());
							} 
						});
					}
				})
				.catch(err => console.log(err));

		 })
		 .catch(err => console.log(err));
		
    }
    
}

module.exports = MoveCommand;