//Standard ping command to see if the bot is awake, remove from release

const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reply',
            group: 'util',
            memberName: 'reply',
            description: 'Replies with a Message.',
            examples: ['reply']
        });
    }

    run(msg) {
        msg.delete();
        return msg.say('Hi, I\'m awake!');
    }
};