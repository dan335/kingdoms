const _f = require('../functions.js');


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

		let isWin = numSoldiersSending > otherUser.soldiers;

		if (isWin) {
			// battle is won
			const numFoodStolen = otherUser.food * Math.random() * 0.2;
			const numShrinesDestroyed = otherUser.shrines * Math.random() * 0.2;
			console.log(numShrinesDestroyed)
			let str = 'Battle was won.  You stole '+_f.formatNumber(numFoodStolen, 3)+' food and destroyed '+_f.formatNumber(numShrinesDestroyed, 3)+' shrines.';
			await usersCollection.updateOne({_id: user._id}, {$inc: {food:numFoodStolen}, $set: {hasAttackedToday:true}});
			await usersCollection.updateOne({_id:otherUser._id}, {$set: {shrines:Math.max(0, otherUser.shrines-numShrinesDestroyed)}});

			createThread(interaction, user, otherUser, true, numFoodStolen, numShrinesDestroyed, null);

			return interaction.reply(str);
		} else {
			// battle is lost
			const numSoldiersLost = numSoldiersSending * Math.random() * 0.5;
			let str = 'Battle was lost. You lost '+_f.formatNumber(numSoldiersLost, 3)+' soldiers.';
			await usersCollection.updateOne({_id: user._id}, {$inc: {soldiers:-numSoldiersLost}, $set: {hasAttackedToday:true}})

			createThread(interaction, user, otherUser, false, null, null, numSoldiersLost);

			return interaction.reply(str);
		}
	},
};


const createThread = async (interaction, user, otherUser, isWon, numFoodStolen, numShrinesDestroyed, numSoldiersLost) => {
	let str = user.name+' attacked '+otherUser.name+' and '+(isWon ? 'won' : 'lost')+'.  ';

	if (isWon) {
		str += user.name+' stole '+_f.formatNumber(numFoodStolen, 3)+' food and destroyed '+_f.formatNumber(numShrinesDestroyed, 3)+' shrines.';
	} else {
		str += user.name+' lost '+_f.formatNumber(numSoldiersLost, 3)+' soldiers.';
	}

	const thread = await interaction.channel.threads?.create({
		name: user.name+'-'+otherUser.name+'-'+(isWon ? 'won' : 'lost'),
		autoArchiveDuration: 1440,
		reason: str
	})

	if (thread) {
		thread.members.add(user.discordId);
		thread.members.add(otherUser.discordId);

		thread.send(str);
	}
}