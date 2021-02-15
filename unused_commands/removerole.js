const Discord = require('discord.js');
const { Command } = require('discord-akairo');

class RemoveRoleCommand extends Command {
    constructor() {
        super('removerole', {
            aliases: ['removerole', 'takerole'],
            category: 'moderation',
            description: 'Take a user\'s role.',
            ownerOnly: false,
            channel: 'guild',
            userPermissions: 'MANAGE_ROLES',
            clientPermissions: 'MANAGE_ROLES'
        });
    }

    async exec(message, args) {
        let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!member) return await message.util.send('Couldn\'t find user.')
        let role = args.join(" ").slice(22);
        if (!role) return await message.util.send('specify a role!');
        let gRole = message.guild.roles.find(`name`, role)
        if (!gRole) return await message.util.send('couldn\'t find role!')

        if (!member.roles.has(gRole.id)) {
            return message.util.send(`<@${member.id}> does not have <@${gRole.id}>`)
        }
        await (member.addRole(gRole.id))
        try {
            await member.send(`Your role ${gRole.name}, got removed.`)
        }
        catch(e) {
            await message.util.send(`<@${member.id}> your role <@${gRole.id}>, got removed.`)
        }
    }
};

module.exports = RemoveRoleCommand;