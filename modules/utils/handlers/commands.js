const fs = require('fs');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const logger = require("../logger.js");
const commandFiles = fs.readdirSync('./modules/commands').filter(file => file.endsWith('.js'));

module.exports = {
    loadCommands(client) {
        const commands = [];

        for (const file of commandFiles) {
            const command = require(`../../commands/${file}`);
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        }

        const rest = new REST({ version: '9' }).setToken(client.config.token);

        /*rest.put(
            Routes.applicationCommands(client.config.clientId),
            { body: commands },
        )
            .then(() => logger.discord('Successfully registered application commands.'))
            .catch(console.error);*/
            rest.put(Routes.applicationGuildCommands(client.config.clientId, "863600892216737884"), { body: commands })
            .then(() => logger.discord('Successfully registered application commands.'))
            .catch(console.error);
        
        client.logger = logger;
    }
}