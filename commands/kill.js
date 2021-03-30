const { randColor } = require("../funcs.js");
const { Command } = require('discord-akairo');
const upgrade = require('../data/upgradeData.json');
const storage = require('../data/storageData.json');
const Discord = require("discord.js");
const fs = require('fs');
const killed = new Set()
class KillCommand extends Command {
	constructor() {
		super('kill', {
			aliases: ['kill'],
			category: 'actions',
			description: 'Kill someone.',
			ownerOnly: false,
			channel: ['guild'],
			args: [
				{
					id: 'member',
					type: 'user',
					prompt: {
						start: 'Who would you like to kill?',
						retry: 'Invalid user, Who would you like to kill?',
						limit: 3,
						ended: 'Too many retries.',
						cancel: 'Cancelled the command',
						timeout: 'Out of time.'
					}
				}
			]
		})
	}

	async exec(message, args) {
		if (!upgrade[args.member.id]) {
			upgrade[args.member.id] = {
				skillPoints: 1,
				curHp: 100,
				health: 100,
				attack: 10,
				storage: 0,
				storageSpace: 400,
				stealth: 1,
				critical: 2,
			}
		}
		if (upgrade[message.author.id].curHp <= 0) {
            return await message.util.send('You are dead, use a revive to revive yourself!')
        }
		if (args.member.bot) {
			return await message.util.send('You can\'t kill bots')
		}
		if (upgrade[args.member.id].curHp <= 0) {
			return await message.util.send('This user is already dead')
		}
		if (killed.has(args.member.id)) return await message.util.send(`${args.member} is currently immune.`);
    	else {

			let member = args.member;
			let me = message.author.id;

			let userSkillPoints = upgrade[member.id].skillPoints;
			let curHp = upgrade[member.id].curHp;
			let rifle = storage[me].rifle;
			let storageMin = upgrade[member.id].storage;
			let userHealth = upgrade[member.id].health;
			let argsUserAttack = upgrade[me].attack;
			let userAttack = upgrade[member.id].attack;
			let userStorage = upgrade[member.id].storageSpace;
			let argsUserStealth = upgrade[me].stealth;
			let userStealth = upgrade[member.id].stealth;
			let userCritical = upgrade[member.id].critical;
			if (rifle > 0) {
				if (Math.random() < (argsUserStealth/100)) {
					curHp = curHp - curHp;
					try {
						member.send(`You were killed by ${message.author.username} in ${message.guild.name}.`)
					}
					catch {
						return;
					}
				}
				else {
					return await message.util.send('You were caught');
				}
			}
			else {
				if (curHp > argsUserAttack) {
					return await message.util.send(`You can't kill ${member}! You're too weak!`)
				}
				else {
					curHp = 0;
					try {
						member.send(`You were killed by ${message.author.username} in ${message.guild.name}.`)
					}
					catch {
						return;
					}
				}
			}
			upgrade[member.id] = {
				skillPoints: userSkillPoints,
				curHp: curHp,
				health: userHealth,
				attack: userAttack,
				storage: storageMin,
				storageSpace: userStorage,
				stealth: userStealth,
				critical: userCritical,
			}
			fs.writeFile('data/upgradeData.json', JSON.stringify(upgrade), (err) => {
				let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
			});
			killed.add(args.member.id);
			setTimeout(() => {
				killed.delete(args.member.id)
			}, 3600000);
			return await message.util.send(`You killed ${member}`)
			
		}
	};
};

module.exports = KillCommand;