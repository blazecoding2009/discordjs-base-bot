const { Client, Collection, Intents } = require('discord.js');
const cmdHandler = require("./handlers/commands.js");
const evntHandler = require("./handlers/events.js");
const { connect } = require('mongoose');
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = class BaseClient extends Client {
    constructor() {
            super({
                partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
                intents: [
                    Intents.FLAGS.GUILDS,
                    Intents.FLAGS.GUILD_MESSAGES,
                    Intents.FLAGS.DIRECT_MESSAGES,
                    Intents.FLAGS.DIRECT_MESSAGE_TYPING
                ]
            });

            this.config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
            this.commands = new Collection();
            this.logger = require('../utils/logger.js');
            if (this.database.enabled) {
                this.database = connect(`mongodb+srv://${this.config.mongo.username}:${encodeURIComponent(this.config.mongo.password)}@${this.config.mongo.endpart}`, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }).then(() => this.logger.database("MongoDB Connected successfully!"));
            } else {
                this.logger.database("MongoDB is disabled.")
            }
        }

    async start() {
        cmdHandler.loadCommands(this);
        evntHandler.loadEvents(this);
        super.login(this.config.token);
    }
}