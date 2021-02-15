const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const contributors = require('../contributors.json')
const fs = require('fs')
const ContributorRole = this.client.roles.cache.get('809814281984933930');
const ContributorChannel = this.client.channels.cache.get('809823872550567966');
class ContributorsCommand extends Command {
    constructor() {
        super('contributor', {
            aliases: ['contributor', 'contribute'],
            category: 'bot maker',
            description: 'Add someone to the contributor list',
            ownerOnly: true,
            channel: 'guild',
            args: [
                {
                    id: 'user',
                    type: 'user',
                    prompt: {
                        start: 'Who would you like to add to the contributor list?',
                        retry: 'Invalid name, try again.',
                    }
                }
            ]
        })
    };
    async exec(message, error) {
        let m = message.ContributorChannel.send(`<@${args.user.id}> congratulations, you got added to the contributor team!, you can now use this channel!`)
        args.user.addRole(ContributorRole)
        try {
        args.user.send(`You got added to the contributor team of ${this.client.user.username}, you can now use <#${channel}>`)
        }
        catch(error) {
            m
        }
        if (!m) {
            return await message.ContributorChannel.send(`Welcome to the contributor team ${args.user.username}`)
        }
        if (args.user.id == contributors[args.user.id]) {
            return await message.util.send(`${args.user} is already a contributor`)
        }
        contributors[args.user.id] = {
            contributor: args.user.id
        }
        message.ContributorChannel.send(`${args.user.tag} got added to the contributor team!`)
        fs.writeFileSync('contributors.json', JSON.stringify(args.user.id[args.user.username]))
        }
    }

    module.exports = ContributorsCommand;