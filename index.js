const commando = require('discord.js-commando');
const path = require('path');

const client = new commando.Client({
    commandPrefix: '~',
    owner: '//Owner ID goes here',
    disableEveryone: true
});


client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['util', 'Utility Commands'],
        ['info', 'Info Commands'],
        ['fun', 'Silly Commands']

    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));


client.on('ready', () => {
    console.log('Logged in!');
    client.user.setGame('//Your game here');
});

client.login('//Bot Login token goes here')
