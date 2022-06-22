const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('name')
        .setDescription('description'),
    async execute(interaction) {
    }
}
