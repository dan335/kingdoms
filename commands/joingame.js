module.exports = {
	name: 'joingame',
	description: 'Join the game.',
	async execute(interaction, db) {

		const usersCollection = db.collection('users');

		const found = await usersCollection.findOne({discordId: interaction.user.id});

		if (found) {
			return interaction.reply('You are already in the game.');
		}

		const user = {
			discordId: interaction.user.id,
			name: interaction.member.displayName,
			population: 10,
			populationGained: 0,
			farmers: 0.6,
			recruitment: 0.2,
			soldiersGained: 0,
			soldiers: 0,
			builders: 0.1,
			researchers: 0.1,
			food: 100,
			foodGained: 0,
			shrines: 0,
			shrinesGained: 0,
			hasAttackedToday: false,
			research: 1, 	// starts at 1.  is a multiplier
			researchGained: 0
		};

		await usersCollection.insert(user);

		return interaction.reply('Welcome to Kingdoms!  View your kingdom with /kingdom.');
	},
};