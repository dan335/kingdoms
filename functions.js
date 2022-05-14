// Takes an array of hours as number and a function to execute
const executeOnHours = (hours, callback) => {
  callback(); // First, execute once
  let now = new Date();
  const hoursWithToogle = hours.map(h => {
    return {
      value: h,
      executedToday: now.getHours() === h // Don't run now if already on the given hour
    }
  });
  setInterval(() => {
    now = new Date();
    const triggers = hoursWithToogle.filter(h => {
      if (!h.executedToday && h.value === now.getHours()) {
        return h.executedToday = true;
      } else if (h.value !== now.getHours()) {
        h.executedToday = false; // Clean the boolean on the next hour
      }
    });
    if (triggers.length) callback(); // Trigger the action if some hours match
  }, 30000); // Fix a precision for the check, here 30s
}


const newDay = async (db) => {
	const usersCollection = db.collection('users');

	const users = await usersCollection.find({}).toArray();

	users.forEach(user => {
		let food = 0;

		// give food
		food += user.population * user.farmers * user.research;

		// take away food
		food -= user.population - user.population * user.farmers;

		user.food = Math.max(0, user.food + food);

		// grow population
		let populationGained = 0;
		if (user.food > 0) {
			populationGained += 1;
		} else {
			populationGained -= 1;
		}
		user.population = Math.max(0, user.population + populationGained);

		// train soldiers
		if (!user.recruitment) {
			user.recruitment = 0;
		}
		let soldiersGained =  + (user.population + populationGained) * user.recruitment * 0.1;

		user.population = Math.max(0, user.population - soldiersGained);
		user.soldiers = Math.max(0, user.soldiers + soldiersGained);

		usersCollection.updateOne({_id:user._id}, {$inc: {
			research: 0.05 * user.researchers,
			shrines: user.population * user.builders * 0.005 * user.research,
		}, $set: {
			hasAttackedToday: false,
			food: user.food,
			foodGained: food,
			shrinesGained: user.population * user.builders * 0.005 * user.research,
			researchGained: 0.05 * user.researchers,
			population: user.population,
			populationGained: populationGained,
			soldiers: user.soldiers,
			soldiersGained: soldiersGained
		}})
	})
}


const formatAMPM = (date) => {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}


const formatNumber = (num, precision) => {
	if (typeof num == 'undefined') {
		num = 0;
	}
	return num.toFixed(precision)
}


const timeString = () => {
	return (60 - new Date().getMinutes()).toString()+" minutes until next turn.";
}


const checkForGameOver = async (client, db) => {
	const shrinesToWin = 10;
	
	let winners = [];

	const usersCollection = db.collection('users');
	const users = await usersCollection.find({}).toArray();
	users.forEach(user => {
		if (user.shrines >= shrinesToWin) {
			winners.push(user);
		}
	});

	if (winners.length) {
		let winner = null;
		let highest = 0;

		winners.forEach(u => {
			if (u.shrines > highest) {
				winner = u;
				highest = u.shrines;
			}
		})

		if (winner) {
			gameOverWin(client, db, winner);
		}
	}
}


const gameOverWin = async (client, db, winningUser) => {
	const winnersCollection = db.collection('winners');

	let obj = {
		date: new Date(),
		user: winningUser
	}

	await winnersCollection.insertOne(obj);

	const usersCollection = db.collection('users');
	const users = await usersCollection.find({}).toArray();
	let str = 'Kingdoms has ended.  '+winningUser.name+' won.  A new game has started.';
	users.forEach(user => {
		client.users.fetch(user.discordId).then(user => {
			user.send(str)
		})
	})

	resetGame(db);
}


const resetGame = async (db) => {
	const usersCollection = db.collection('users');
	usersCollection.drop();
}

module.exports = {executeOnHours:executeOnHours, newDay:newDay, formatAMPM:formatAMPM, formatNumber:formatNumber, timeString:timeString, checkForGameOver:checkForGameOver}