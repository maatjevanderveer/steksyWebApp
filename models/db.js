//- JAVASCRIPT CODE TO COMMUNICATE WITH DATABASE BY USING SEQUELIZE //-


// SET UP CONNECTION WITH DATABASE
const Sequelize = require('sequelize')
var db = new Sequelize ('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/steksy');

// TESTING DATABASE CONNECTION
db
.authenticate()
.then(function(err) {
	console.log('Connection has been established successfully.');
}, function (err) {
	console.log('Unable to connect to the database:', err);
});

// DEFINE MODEL (W/ USERS)
const User = db.define('user', {
	userName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email:{
		type:Sequelize.STRING,
		allowNull:false, 
	},
	password: {
		type: Sequelize.STRING,
		allowNull:false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull:false,
	},
	address: {
		type: Sequelize.STRING,
		allowNull:false,
	},
	houseNumber: {
		type: Sequelize.INTEGER,
		allowNull:false,
	},
	zipcode: {
		type: Sequelize.STRING,
		allowNull:false,
	},
	city: {
		type: Sequelize.STRING,
		allowNull:false,
	}

});

// DEFINE MODEL (W/ USERS)
const Plant = db.define('plant', {
	plantName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});

// RELATIONSHIP BETWEEN TABLES
User.hasMany(Plant); // A person can have many plants
Plant.belongsTo(User); // a plant belongs to a single person


// SYNC DATABASE
db.sync({
	force:true			// drops tables before recreating
})
.then(function(){
	return User.create ({
		userName: "Admin",
		email: "admin@mail.com",
		password: "123",
		name: "admin",
		address: "Prinsengracht",
		houseNumber: "241",
		zipcode: "1015DT",
		city: "Amsterdam"
	})
	.then(function(user){
		return user.createPlant ({
			plantName: "pancakeplant",
			description: "ik bied een stekje aan van mijn lieve pannekoekenplantje. Niet eetbaar.",
			userId: "user.userId"
		})
	})
	.then(function(){
		return User.create ({
			userName: "Petra",
			email: "petra@mail.com",
			password: "123",
			name: "Petra Plant",
			address: "Utrechtsestraat",
			houseNumber: "241",
			zipcode: "1015DT",
			city: "Utrecht"
		})
	})
	.then(function(user){
		return user.createPlant ({
			plantName: "Cactus",
			description: "Pas op ik prik!",
			userId: "user.userId"
		})
	})
	.then(function(){
		return User.create ({
			userName: "Karel",
			email: "karel@mail.com",
			password: "123",
			name: "Karel Kool",
			address: "Coolsingel",
			houseNumber: "18",
			zipcode: "3011AD",
			city: "Rotterdam"
		})
	})
	.then(function(user){
		return user.createPlant ({
			plantName: "Aloë Vera",
			description: "Aloa, ik groei als kool",
			userId: "user.userId"
		})
	})
	.catch ( function (error){
		console.log(error)
	})
})



// EXPORT MODEL TO APP.JS
module.exports = {
	db: db,
	User:User,
	Plant:Plant
}