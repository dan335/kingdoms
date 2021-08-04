module.exports = {
	name: 'leavegame',
	description: 'Destroy your kingdom.',
	async execute(interaction, db) {

		const usersCollection = db.collection('users');

		const found = await usersCollection.findOne({discordId: interaction.user.id});

		if (!found) {
			return interaction.reply('You are not in the game.  Join with /joingame.');
		} else {
			await usersCollection.deleteOne({discordId: interaction.user.id});

			return interaction.reply('You kingdom has been destroyed.');
		}
	},
};