const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const upgrade = require('../data/upgradeData');
const xp = require('../data/xpData.json');
const fs = require('fs');

class ReskillCommand extends Command {
    constructor() {
        super('reskill', {
            aliases: ['reskill'],
            category: 'economy',
            description: 'Reset all of your skills. Earn your skill points back at the cost of losing your bought skill points.',
            args: [
                {
                    id: 'choice',
                    type: ['yes', 'no'],
                    prompt: {
                        start: 'Are you sure? `yes` or `no`'
                    }
                },
                {
                    id: 'choice2',
                    type: ['yes', 'no'],
                    prompt: {
                        start: 'Are you sure sure?'
                    }
                },
                {
                    id: 'choice3',
                    type: ['yes', 'no'],
                    prompt: {
                        start: 'Are you 100% sure?'
                    }
                },
                {
                    id: 'choice4',
                    type: ['yes', 'no'],
                    prompt: {
                        start: 'Is this really something you want to do?'
                    }
                }
            ]
        })
    }

    async exec(message, args) {
        let choice = args.choice
        let choice2 = args.choice2
        let choice3 = args.choice3
        let choice4 = args.choice4
        let level = xp[message.author.id].level;
        let m = message.util
        if (choice == 'yes') {
            if (choice2 == 'yes') {
                if (choice3 == 'yes') {
                    if (choice4 == 'yes') {
                        upgrade[message.author.id] = {
                            skillPoints: level,
                            curHp: 100,
                            health: 100,
                            attack: 10,
                            storage: upgrade[message.author.id].storage,
                            storageSpace: 400,
                            stealth: 1,
                            critical: 2,
                        }
                        fs.writeFile('data/upgradeData.json', JSON.stringify(upgrade), (err) => {
                            let errEmbed = new Discord.MessageEmbed()
                                .setTitle('JSON OVERLOAD')
                                .setColor(0xaa00cc)
                                .setDescription(`\`\`\`json\n${err}\`\`\``)
                            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
                        });
                        await m.send('Your skills have been reset.')
                    }
                    else {
                        m.send('For one second I thought you were lost...')
                    }
                }
                else {
                    m.send('You went really far...')
                }
            }
            else {
                m.send('You really went in...')
            }
        }
        else {
            m.send('I thought so...')
        }
    } 
}

module.exports = ReskillCommand;