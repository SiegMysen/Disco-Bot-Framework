//Owner only command. Change to admin?

const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'game',
            group: 'util',
            memberName: 'game',
            description: 'Sets game status',
            throttling: {
                usages: 2,
                duration: 10
            },
            
            args: [
                {
                    key: 'text',
                    prompt: 'What would you like me to play?',
                    type: 'string'
                }
            ]
        });
    }




    run(message, args) {

        const { text } = args;

        if (message.author.id == 198288906280632320) {
            message.reply('Response message goes here.');
            //await client.user.setGame(text);
        }
        else {
            message.reply('Go away, weirdo.');
        }
}
    };
