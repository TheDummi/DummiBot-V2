const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const dummicoin = require('../currency.json');
const { fs } = require('fs');
class RobCommand extends Command {
    constructor() {
        super('rob', {
            aliases: ['rob', 'steal'],
            category: 'actions',
            cooldown: 3600000,
            description: 'Steal Dummicoins from someone.',
            ownerOnly: false,
			channel: 'guild',
            args: [
                {
                    id: 'user',
                    type: 'user',
                    prompt: {
                        start: 'Who would you like to gift?',
                        retry: 'Invalid user, Who would you like to gift?',
                    }
                }
            ]
        })
    }

    async exec(message, args) {

        let member = args.user.id
        if(args.user.bot) {
            let BotEmbed = new Discord.MessageEmbed()
            .setTitle('You cannot steal from bots')
            .setColor(0xaa00cc)
            return await message.channel.send(BotEmbed)
        }
        if(!dummicoin[member]) {
            dummicoin[member] = {
                Dimboins: 0,
                Gold: dummicoin[member].Gold
            }
            return await message.util.send(`${args.user} does not have any dummicoins!`)
        }
        
        let argsCoins = dummicoin[member].Dimboins;
        let userCoins = dummicoin[message.author.id].Dimboins;
        const random = Math.floor(Math.random() * argsCoins);
        
        
        const successRate = Math.floor(Math.random() * Math.floor(5));
        if (successRate === 0) {
            dummicoin[message.author.id] = {
                Dimboins: userCoins + parseInt(random),
                Gold: dummicoin[member].Gold
            }

            dummicoin[argsCoins] = {
                Dimbions: argsCoins - parseInt(random),
                Gold: dummicoin[member].Gold
            }

            message.util.send(`You stole ${random} dummicoins from ${args.user}`)

        }
        if (successRate === 1) {
            const random2 = Math.floor(Math.random() * userCoins)
            dummicoin[message.author.id] = {
                Dimboins: userCoins - parseInt(random2) - 1000,
                Gold: dummicoin[member].Gold
            };
            dummicoin[argsCoins] = {
                Dimbions: argsCoins + parseInt(random2),
                Gold: dummicoin[member].Gold
            }
            message.util.send(`you got caught by the police, and had to pay ${args.user} ${random2}, and 1000 for stealing!`)
        }
        if (successRate === 2) {
        const failure = [
            'You got caught sneaking!',
            'You were found!',
            `You almost ran of with ${random}, but you got caught!`,
        ];
        const failures = () => failure[Math.floor(Math.random() * failure.length)];
            return await message.util.send(failures())
        }
        if (successRate === 2) {
            const failure = [
                'You got caught sneaking!',
                'You were found!',
                `You almost ran of with ${random}, but you got caught!`,
            ];
            const failures = () => failure[Math.floor(Math.random() * failure.length)];
                return await message.util.send(failures())
        }
        if (successRate === 3) {
            const failure = [
                'You got caught sneaking!',
                'You were found!',
                `You almost ran of with ${random}, but you got caught!`,
            ];
            const failures = () => failure[Math.floor(Math.random() * failure.length)];
            return await message.util.send(failures())
        }
        if (successRate === 4) {
            const failure = [
                'You got caught sneaking!',
                'You were found!',
                `You almost ran of with ${random}, but you got caught!`,
            ];
            const failures = () => failure[Math.floor(Math.random() * failure.length)];
            return await message.util.send(failures())
        }
        if (successRate === 5) {
            const failure = [
                'You got caught sneaking!',
                'You were found!',
                `You almost ran of with ${random}, but you got caught!`,
            ];
            const failures = () => failure[Math.floor(Math.random() * failure.length)];
            return await message.util.send(failures())
        }
        fs.writeFile('currency.json', JSON.stringify(coins), (err) => {
            if(err) console.log(err)
        })
    }
}

module.exports = RobCommand;