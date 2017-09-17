const Command = require('../../structures/Command');
const facts = require('../../assets/json/facts');

module.exports = class FactCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fact',
            group: 'fun',
            memberName: 'fact',
            description: 'Responds with a random Fact.'
        });
    }

    run(msg) {
        const fact = facts[Math.floor(Math.random() * facts.length)];
        return msg.say(fact);
    }
};