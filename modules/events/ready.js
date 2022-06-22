
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.logger.discord(`${client.user.tag} is ready!`);
		client.user.setPresence({ activities: [{ name: client.config.status.name, type: client.config.status.type }], status: client.config.status.presense });
	}
};