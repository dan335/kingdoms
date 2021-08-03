module.exports = {
	name: 'joingame',
	description: 'Join the game.',
	async execute(interaction, game) {
		let found = false;

		game.users.forEach(user => {
			if (user.discordId == interaction.user.id) {
				found = true;
			}
		})

		if (found) {
			return interaction.reply('You are already in the game.');
		}

		game.users.push({
			discordId: interaction.user.id,
			name: interaction.member.displayName,
			population: 10,
			farmers: 0.4,
			soldiers: 0.4,
			builders: 0.1,
			researchers: 0.1,
			food: 100,
			shrines: 0,
			hasAttackedToday: false,
			research: 1 	// starts at 1.  is a multiplier
		})

		return interaction.reply('Welcome to Kingdoms!  View your kingdom with /kingdom.');
	},
};