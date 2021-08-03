module.exports = {
	name: 'kingdom',
	description: 'View your kingdom.',
	async execute(interaction, game) {
		let user = null;

		game.users.forEach(u => {
			if (u.discordId == interaction.user.id) {
				user = u;
			}
		})

		if (!user) {
			return interaction.reply('You are not in the game.  Join with /joingame.');
		}

		let str = "-[ **"+user.name+"**'s Kingdom ]-\n\
population: "+user.population+"k\n\
farmers: "+Math.round(user.farmers * 100) + "%\n\
soldiers: "+Math.round(user.soldiers * 100) + "%\n\
builders: "+Math.round(user.builders * 100) + "%\n\
researchers: "+Math.round(user.researchers * 100) + "%\n\
food: "+user.food+"\n\
research: "+user.research+"x\n\
shrines: "+user.shrines+"\n\n";

		str += user.hasAttackedToday ? "Your soldiers are tired and cannot attack again today." : "Your soldiers are ready to attack.\n";

		return interaction.reply(str);
	},
};