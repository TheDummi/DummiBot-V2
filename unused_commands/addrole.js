const Discord = require('discord.js');
const { Command } = require('discord-akairo');

class AddRoleCommand extends Command {
    constructor() {
        super('addrole', {
            aliases: ['addrole', 'giverole'],
            category: 'moderation',
            description: 'Give a user a role.',
            ownerOnly: false,
            channel: 'guild',
            userPermissions: 'MANAGE_ROLES',
            clientPermissions: 'MANAGE_ROLES',
            args: [
                {
                    id: 'user',
                    type: 'user',
                    prompt: {
                        start: 'Who would you like to get the role?',
                        retry: 'Invalid user, Who would you like to get the role?',
                        cancel: 'Cancelled command',
                        limit: 3,
                        ended: 'Too many retries, start over the command.',
                        timeout: 'Ran out of time.'
                    }
                },
                {
                    id: 'role',
                    type: 'role',
                    prompt: {
                        start: 'What role would you like to give?',
                        retry: 'Invalid role, what role would you like to give?',
                        cancel: 'Cancelled command',
                        limit: 3,
                        ended: 'Too many retries, start over the command.',
                        timeout: 'Ran out of time.'
                    }
                }
            ]
        });
    }

    async exec(message, args) {
        let member = args.user;
        console.log("🚀 ~ file: addrole.js ~ line 45 ~ AddRoleCommand ~ exec ~ member", member)
        if (!member) return await message.util.send('Couldn\'t find user.')
        let role = args.role;

        if (args.user.roles.has(role.id))
        console.log(role)
        await (member.addRole(role.id))
        try {
            await member.send(`You got the role ${role.name}`)
        }
        catch(e) {
            await message.util.send(`<@${member.id}> you got <@${role.id}>`)
        }
    }
};

module.exports = AddRoleCommand;