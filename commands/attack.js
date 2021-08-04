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
	async execute(interaction, db) {
		const usersCollection = db.collection('users');

		const user = await usersCollection.findOne({discordId: interaction.user.id});

		if (!user) {
			return interaction.reply('You are not in the game.  Join with /joingame.');
		}

		// find other user
		let otherUser = await usersCollection.findOne({discordId: interaction.options.data[0].user.id});

		if (otherUser == null) {
			return interaction.reply('User not found.');
		}

		// can't attack yourself
		if (user.discordId == otherUser.discordId) {
			return interaction.reply('You cannot attack yourself.');
		}

		// have they already attacked today
		if (user.hasAttackedToday) {
			return interaction.reply('You can only attack once every hour.');
		}

		// are they sending too too few
		if (interaction.options.data[1].value <= 0) {
			return interaction.reply('You must send at least one soldier.');
		}

		// are they sending too many
		const numSoldiersSending = interaction.options.data[1].value;

		if (numSoldiersSending > user.soldiers) {
			return interaction.reply('You do not have '+numSoldiersSending+' soldiers.  You only have '+user.soldiers+'.');
		}

		// the attack is a go

		let isWin = numSoldiersSending > otherUser.population * otherUser.soldiers;

		if (isWin) {
			// battle is won
			const numFoodStolen = otherUser.food * 0.1;
			let str = 'Battle was won.  You stole '+numFoodStolen+' food.';
			await usersCollection.updateOne({_id: user._id}, {$inc: {food:numFoodStolen}, $set: {hasAttackedToday:true}});
			return interaction.reply(str);
		} else {
			// battle is lost
			const numSoldiersLost = numSoldiersSending * 0.3;
			let str = 'Battle was lost. You lost '+numSoldiersLost+' soldiers.';
			await usersCollection.updateOne({_id: user._id}, {$inc: {soldiers:-numSoldiersLost}, $set: {hasAttackedToday:true}})
			return interaction.reply(str);
		}
	},
};