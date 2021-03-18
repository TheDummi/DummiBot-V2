const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const moderation = require('../data/channelData.json');

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
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: 'Who would you like to give the role?',
                        retry: 'Invalid user, Who would you like to give the role?',
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
                        timeout: 'Ran out of time.',
                    }
                }
            ]
        });
    }

    async exec(message, args, command) {

// Define mentioned user and role
        let member = args.member;
        let role = args.role;
        let purple = 0xaa00cc;

// If the mentioned user already has the role
        if (member.roles.cache.has(role.id)) {
            let hasRoleEmbed = new Discord.MessageEmbed()
                .setAuthor(`${member.user.username} already has the \`${role.name}\` role!`, message.mentions.users.first().displayAvatarURL())
                .setColor(purple)
            return await message.channel.send(hasRoleEmbed);
        }

// If the mentioned user does not have the role
        try {
        await (member.roles.add(role.id))
        }

// If the role is higher than DummiBot role
        catch {
            let errorEmbed =  new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}, I couldn't give ${member.user.username} their role. Is the role higher than mine?`, message.author.displayAvatarURL())
                .setColor(purple)
            await message.util.send(errorEmbed);
        }

// send a message to the user, telling them what they got
        try {
            let roleEmbed = new Discord.MessageEmbed()
                .setAuthor(`You got the \`${role.name}\` role in ${message.guild.name}, by ${message.author.username}.`, message.mentions.users.first().displayAvatarURL())
                .setColor(purple)
            await member.send(roleEmbed);
            let confirmEmbed = new Discord.MessageEmbed()
            
// Send a confirmation after completion
                .setAuthor(`${message.author.username} successfully given \`${role.name}\` to ${member.user.username}!`, message.author.displayAvatarURL())
                .setColor(purple)
            await message.util.send(confirmEmbed)
        }

// If the user blocked DummiBot, send a message to the current channel
        catch(e) {
            let blockedEmbed = new Discord.MessageEmbed()
                .setAuthor(`${member.user.username}, you got ${role.name}`, message.mentions.users.first().displayAvatarURL())
                .setColor(purple)
            await message.util.send(blockedEmbed);
        }
        let reportEmbed = new Discord.MessageEmbed()
                .setTitle('Moderation command used!')
                .addField(`Name`, message.author, true)
                .addField(`Command`, "addrole", true)
                .addField(`Command specifics`, `Given ${args.role} to ${args.member}`)
                .setTimestamp()
                .setColor(0xaa00cc)
        try {
            let channel = moderation[message.guild.id].moderation;
            channel = this.client.channels.cache.get(channel);
            await channel.send(reportEmbed);
        }
        catch {
            message.channel.send('No moderation channel set-up, no logging of this command.')
            .then(message => {
                setTimeout(function() {
                    message.delete()
                }, 30000)
            });
        }
    }
};

module.exports = AddRoleCommand;