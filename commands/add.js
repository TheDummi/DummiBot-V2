const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs');
const coins = require('../currency.json');
const xp = require('../xp.json');
class AddCashCommand extends Command {
    constructor() {
        super('add', {
            aliases: ['add', 'remove'],
            category: 'bot maker',
            description: 'Add/remove coins, silver, gold, diamond, level, or respect',
            ownerOnly: true,
			channel: 'guild',
            args: [
                {
                    id: 'user',
                    type: 'user',
                    prompt: {
                        start: 'Who would you like to add to?',
                        retry: 'Invalid user, Who would you like to add/remove to?',
                    }
                },
                {
                    id: 'choice',
                    type: ['coins', 'silver', 'gold', 'diamond', 'level', 'respect'],
                    prompt: {
                        start: 'What would you like to add/remove?\n`coins`\n`silver`\n`diamond`\n`level`\n`respect`',
                        retry: 'Invalid choice.'
                    }
                },
                {
                    id: 'message',
                    type: 'number',
                    match: 'rest',
                    prompt: {
                        start: 'How much would you like to add/remove?'
                    }
                },
            ]
        })
    }

    async exec(message, args) {

// Define member as mentioned user.
        let member = args.user.id

// If member has no coins, set defaults
        if(!coins[member]){
            coins[member] ={
                Dimboins: 0,
                silver: 0,
                Gold: 0,
                diamond: 0
            };
        }
        
        if (!xp[member]) {
            xp[member] = {
                xp: 0,
                level: 1,
                respect: 0,
                respectLevel: 1,
                prestige: 0
            }
        }

// Define member coins and member gold
        let memberCoins = coins[member].Dimboins;
        let memberSilver = coins[member].silver;
        let memberGold = coins[member].Gold;
        let memberDiamond = coins[member].diamond;

// If the command is addcash
        if (message.util.parsed.alias === 'add') {

        if (args.choice == 'coins') {
        coins[member] = {
            Dimboins: memberCoins + parseInt(args.message),
            silver: memberSilver,
            Gold: memberGold,
            diamond: memberDiamond
            }
        }

        if (args.choice == 'silver') {
        coins[member] = {
            Dimboins: memberCoins,
            silver: memberSilver + parseInt(args.message),
            Gold: memberGold,
            diamond: memberDiamond
            }
        }

        if (args.choice == 'gold') {
            coins[member] = {
                Dimboins: memberCoins,
                silver: memberSilver,
                Gold: memberGold + parseInt(args.message),
                diamond: memberDiamond
                }
            }

        if (args.choice == 'diamonds') {
            coins[member] = {
                Dimboins: memberCoins,
                silver: memberSilver,
                Gold: memberGold,
                diamond: memberDiamond + parseInt(args.message)
                }
            }

        if (args.choice == 'level') {
            xp[member] = {
                xp: xp[member].xp + parseInt(args.message * 2000),
                level: xp[member].level + parseInt(args.message),
                respect: xp[member].respect,
                respectLevel: xp[member].respectLevel,
                prestige: xp[member].prestige
            }
        }
        if (args.choice == 'respect') {
            xp[member] = {
                xp: xp[member].xp,
                level: xp[member].level,
                respect: xp[member].respect + parseInt(args.message * 100),
                respectLevel: xp[member].respectLevel + parseInt(args.message),
                prestige: xp[member].prestige
            }
        }

        let WithDrawEmbed = new Discord.MessageEmbed()
            .setAuthor(`Added ${args.message} ${args.choice} to ${args.user.username}`, args.user.displayAvatarURL())
            .setColor(0xaa00cc)
        try {
            await args.user.send(WithDrawEmbed)
            await message.util.send(WithDrawEmbed)
        }
        catch {
            await message.util.send(WithDrawEmbed)
        }
        
        fs.writeFile('currency.json', JSON.stringify(coins), (err) => {
            if(err) console.log(err)
            });
        }

        if (message.util.parsed.alias === 'remove') {
            if (args.choice == 'coins') {
                coins[member] = {
                    Dimboins: memberCoins - parseInt(args.message),
                    silver: memberSilver,
                    Gold: memberGold,
                    diamond: memberDiamond
                    }
                }
        
                if (args.choice == 'silver') {
                coins[member] = {
                    Dimboins: memberCoins,
                    silver: memberSilver - parseInt(args.message),
                    Gold: memberGold,
                    diamond: memberDiamond
                    }
                }
        
                if (args.choice == 'gold') {
                    coins[member] = {
                        Dimboins: memberCoins,
                        silver: memberSilver,
                        Gold: memberGold - parseInt(args.message),
                        diamond: memberDiamond
                        }
                    }
        
                if (args.choice == 'diamonds') {
                    coins[member] = {
                        Dimboins: memberCoins,
                        silver: memberSilver,
                        Gold: memberGold,
                        diamond: memberDiamond - parseInt(args.message)
                        }
                    }
        
                if (args.choice == 'level') {
                    xp[member] = {
                        xp: xp[member].xp - parseInt(args.message * 2000),
                        level: xp[member].level - parseInt(args.message),
                        respect: xp[member].respect,
                        respectLevel: xp[member].respectLevel,
                        prestige: xp[member].prestige
                    }
                }
                if (args.choice == 'respect') {
                    xp[member] = {
                        xp: xp[member].xp,
                        level: xp[member].level,
                        respect: xp[member].respect - parseInt(args.message * 100),
                        respectLevel: xp[member].respectLevel - parseInt(args.message),
                        prestige: xp[member].prestige
                    }
                }
        
                let WithDrawEmbed = new Discord.MessageEmbed()
                    .setAuthor(`Removed ${args.message} ${args.choice} from ${args.user.username}`, args.user.displayAvatarURL())
                    .setColor(0xaa00cc)
                try {
                    await args.user.send(WithDrawEmbed)
                    await message.util.send(WithDrawEmbed)
                }
                catch {
                    await message.util.send(WithDrawEmbed)
                }
                }
        
        fs.writeFile('xp.json', JSON.stringify(xp), (err) => {
                if(err) console.log(err)
            });
        fs.writeFile('currency.json', JSON.stringify(coins), (err) => {
            if(err) console.log(err)
            });
    }
};

module.exports = AddCashCommand;