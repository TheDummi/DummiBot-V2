const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs')
const coins = require('../data/currency.json');
const upgrade = require('../data/upgradeData.json');
class WithdrawCommand extends Command {
    constructor() {
        super('withdraw', {
            aliases: ['withdraw', 'wit'],
            category: 'economy',
            description: 'Withdraw coins from your bank',
            ownerOnly: false,
			channel: 'guild',
            args: [
                {
                    id: 'message',
                    type: 'number',
                    match: 'rest',
                    prompt: {
                        start: 'How much would you like to deposit?'
                    }
                },
            ]
        })
    }
    async exec(message, args) {
        if (upgrade[message.author.id].curHp <= 0) {
            return await message.util.send('You are dead, use a revive to revive yourself!')
        }
        let embed = new Discord.MessageEmbed()
            .setColor(0xaa00cc)
        if(!coins[message.author.id]){
            coins[message.author.id] = {
                coins: 0,
                bank: 0
            }
            embed = embed.setAuthor(`${message.author.username}, you don't have any coins!`, message.author.displayAvatarURL({ dynamic: true }))
        }

        let userCoins = coins[message.author.id].coins;
        let userBank = coins[message.author.id].bank;

        if (args.message > userBank) {
            embed = embed.setAuthor(`${message.author.username}, you don't have enough coins in your bank!`, message.author.displayAvatarURL({ dynamic: true }))
        }
        else {
            coins[message.author.id] = {
                coins: userCoins + parseInt(args.message),
                bank: userBank - parseInt(args.message),
            }
            embed = embed.setAuthor(`${message.author.username}, you withdrawn ₪ ${args.message} from your bank! You now have ₪ ${coins[message.author.id].coins} in your wallet!`, message.author.displayAvatarURL({ dynamic: true }))
        }
        fs.writeFile('data/currency.json', JSON.stringify(coins), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
        return await message.util.send(embed)
    }
};

module.exports = WithdrawCommand;