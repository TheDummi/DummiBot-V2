const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const contributors = require('../contributors.json')
const fs = require('fs')

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
                    type: 'member',
                    prompt: {
                        start: 'Who would you like to add to the contributor list?',
                        retry: 'Invalid name, try again.',
                    }
                }
            ]
        })
    };
    async exec(message, args) {
        let roles = new Discord.Collection()
            this.client.guilds.cache.forEach(g => {
                g.roles.cache.forEach(r => {
                    roles.set(r.id, r)
                })
            })
        roles.get('id')
        let member = args.user;
        const ContributorRole = roles.get('809814281984933930');
        const ContributorChannel = this.client.channels.cache.get('809823872550567966');
        let m = ContributorChannel.send(`<@${member.id}> congratulations, you got added to the contributor team!, you can now use this channel!`)
        try {
            member.roles.add(ContributorRole)
        }
        catch {
            message.util.send('Couldn\'t give role due to the new contributor not being in the support server.')
        }
            try {
        member.send(`You got added to the contributor team of ${this.client.user.username}, you can now use <#${channel}>`)
        }
        catch(error) {
            m
            if (!m) {
            return await ContributorChannel.send(`Welcome to the contributor team ${member.user.username}`)
            }
        }
        contributors[member.id] = {
            contributor: member.user.username
        }
        fs.writeFileSync('contributors.json', JSON.stringify(contributors), (err) => {
            if (err) console.log(err)
        });
        }
    }

    module.exports = ContributorsCommand;