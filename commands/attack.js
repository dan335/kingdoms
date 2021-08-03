module.exports = {
	name: 'attack',
	description: 'Attack another kingdom and steal food.',
	options: [
		{
			name: 'user',
			type: 'USER',
			description: 'User to attack.',
			required: true
		},
		{
			name: 'num',
			type: 'INTEGER',
			description: 'Number of soldiers to attack with.',
			required: true
		},
	],
	async execute(interaction, game) {
		console.log(interaction.options.data)

		// find user
		let user = null;

		game.users.forEach(u => {
			if (u.discordId == interaction.user.id) {
				user = u;
			}
		})

		if (!user) {
			return interaction.reply('You are not in the game.  Join with /joingame.');
		}

		// find other user
		let otherUser = null;

		game.users.forEach(u => {
			if (u.discordId ==  interaction.data[0].user.id) {
				otherUser = u;
			}
		})

		if (otherUser == null) {
			return interaction.reply('User not found.');
		}

		// have they already attacked today
		if (user.hasAttackedToday) {
			return interaction.reply('You can only attack once every 12 hours.');
		}

		// are they sending too too few
		if (interaction.options.data[1].value <= 0) {
			return interaction.reply('You must send at least one soldier.');
		}

		// are they sending too many
		const usersSoldiers = user.population * user.soldiers;
		const numSoldiersSending = interaction.options.data[1].value;

		if (numSoldiersSending > user.soldiers) {
			return interaction.reply('You do not have '+numSoldiersSending+'.  You only have '+usersSoldiers+'.');
		}

		// the attack is a go

		let isWin = numSoldiersSending > otherUser.population * otherUser.soldiers;

		if (isWin) {
			// battle is won
			const numFoodStolen = otherUser.food * 0.1;
			let str = 'Battle was won.  You stole '+numFoodStolen+' food.';
			user.food += numFoodStolen;
			return interaction.reply(str);
		} else {
			// battle is lost
			const numSoldiersLost = numSoldiersSending * 0.2;
			let str = 'Battle was lost. You lost '+numSoldiersLost+' soldiers.';
			user.population -= numSoldiersLost;
			return interaction.reply(str);
		}
	},
};