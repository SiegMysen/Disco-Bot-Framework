const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class UnbanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unban',
            group: 'util',
            memberName: 'unban',
            description: 'Unbans a user and logs the unban to the mod logs.',
            guildOnly: true,
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            args: [
                {
                    key: 'id',
                    prompt: 'What is the id of the member you want to unban?',
                    type: 'string'
                },
                {
                    key: 'reason',
                    prompt: 'What do you want to set the reason as?',
                    type: 'string',
                    validate: (reason) => {
                        if (reason.length < 140) return true;
                        else return 'Reason must be under 140 characters.';
                    }
                }
            ]
        });
    }

    async run(msg, args) {
        const modlogs = msg.guild.channels.filter((c) => {
            const topic = c.topic || '';
            if (topic.includes('<modlog>')) return true;
            else return false;
        }).first() || msg.guild.channels.find('name', 'mod-log');
        const { id, reason } = args;
        const bans = await msg.guild.fetchBans();
        if (!bans.has(id)) return msg.say('This ID is not in the Guild Banlist.');
        const member = bans.get(id).user;
        await msg.say(`Are you sure you want to unban ${member.tag} (${member.id})?`);
        const msgs = await msg.channel.awaitMessages((res) => res.author.id === msg.author.id, {
            max: 1,
            time: 30000
        });
        if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return msg.say('Aborting.');
        await msg.guild.unban(member, `${msg.author.tag}: ${reason}`);
        await msg.say(`Successfully unbanned ${member.user.tag}.`);
        if (!modlogs || !modlogs.permissionsFor(this.client.user).has('SEND_MESSAGES')) {
            return msg.say('Could not log the unban to the mod logs.');
        } else if (modlogs.permissionsFor(this.client.user).has('EMBED_LINKS')) {
            const embed = new MessageEmbed()
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
                .setColor(0x00AE86)
                .setTimestamp()
                .setDescription(stripIndents`
                    **Member:** ${member.user.tag} (${member.id})
                    **Action:** Unban
                    **Reason:** ${reason}
                `);
            return modlogs.send({ embed });
        } else {
            return modlogs.send(stripIndents`
                **Member:** ${member.user.tag} (${member.id})
                **Action:** Unban
                **Reason:** ${reason}
                **Moderator:** ${msg.author.tag}
            `);
        }
    }
};