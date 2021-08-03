module.exports = {
	name: 'leavegame',
	description: 'Destroy your kingdom.',
	async execute(interaction, game) {
		const index = game.users.findIndex(u => {
			return u.discordId == interaction.user.id;
		})

		if (index == -1) {
			return interaction.reply('You are not in the game.  Join with /joingame.');
		} else {
			game.users.splice(index, 1);

			return interaction.reply('You kingdom has been destroyed.');
		}
	},
};