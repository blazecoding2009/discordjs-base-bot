module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (interaction.isCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction, interaction.client);
            } catch (error) {
                interaction.client.logger.error(error);
                if (interaction.replied) return interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        } else if (interaction.isButton()) {
        }
	},
};