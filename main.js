const Discord = require('discord.js');
const getPrefix = require('./funcs.js')
const fs = require('fs');
const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler, setEmitters } = require('discord-akairo');

class MyClient extends AkairoClient {
    constructor() {
        super({
            ownerID: ['482513687417061376', '487443883127472129'],        }, {
            disableMentions: 'everyone'
        });
        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: ['~'], // I had to add this even though we have a configurable one....
            defaultCooldown: 5000,
            ratelimit: 2,
            ignoreCooldown: ['482513687417061376', '487443883127472129'],
            handleEdits: true,
            commandUtil: true,
            clientPermissions: 'EMBED_LINKS'
        });        
        this.commandHandler.loadAll();
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './inhibitors/'
        });
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.inhibitorHandler.loadAll();
        this.listenerHandler = new ListenerHandler(this, {
            directory: './listeners/'
        });
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler,
            process: process,
        });
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
    }
}
const client = new MyClient();
const token = fs.readFileSync("token.txt").toString()
client.login(token);
