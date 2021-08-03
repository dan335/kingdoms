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
			name: 'soldiers',
			type: 'INTEGER',
			description: 'Percentage of population to assign to soldiering.  0 - 100',
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
	async execute(interaction, game) {
		//console.log(interaction.options.data)

		// do numbers add up to 100
		let sum = 0;

		interaction.options.data.forEach(d => {
			sum += d.value;
		})

		if (sum != 100) {
			return interaction.reply('Numbers must add up to 100.');
		}

		// is user in game
		let user = null;

		game.users.forEach(u => {
			if (u.discordId == interaction.user.id) {
				user = u;
			}
		})

		if (!user) {
			return interaction.reply('You are not in the game.  Join with /joingame.');
		}

		// set user
		interaction.options.data.forEach(d => {
			user[d.name] = d.value / 100;
		})

		return interaction.reply('Your population has been assigned.  View your kingdom with /kingdom.');
	},
};