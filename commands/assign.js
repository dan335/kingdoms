module.exports = {
	name: 'assign',
	description: 'Assign soldiers and farmers.',
	options: [
		{
			name: 'farmers',
			type: 'INTEGER',
			description: 'Percentage of population to assign to farming.  0 - 100',
			required: true
		},
		{
			name: 'recruitment',
			type: 'INTEGER',
			description: 'Percentage of population to train to be soldiers.  0 - 100',
			required: true
		},
		{
			name: 'researchers',
			type: 'INTEGER',
			description: 'Percentage of population to assign to researching.  0 - 100',
			required: true
		},
		{
			name: 'builders',
			type: 'INTEGER',
			description: 'Percentage of population to assign to building.  0 - 100',
			required: true
		},
	],
	async execute(interaction, db) {
		const usersCollection = db.collection('users');

		// do numbers add up to 100
		let sum = 0;

		interaction.options.data.forEach(d => {
			sum += d.value;
		})

		if (sum != 100) {
			return interaction.reply('Numbers must add up to 100.');
		}

		// is user in game
		const user = await usersCollection.findOne({discordId: interaction.user.id});

		if (!user) {
			return interaction.reply('You are not in the game.  Join with /joingame.');
		}

		// set user
		let set = {};
		interaction.options.data.forEach(d => {
			set[d.name] = d.value / 100;
		})

		usersCollection.updateOne({discordId: interaction.user.id}, {$set: set});		

		return interaction.reply('Your population has been assigned.  View your kingdom with /kingdom.');
	},
};