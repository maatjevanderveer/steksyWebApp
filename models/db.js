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
			description: "ik bied een stekje aan van mijn lieve pannekoekenplantje",
			userId: "user.userId"
		})
	})
	.then(function(){
		return User.create ({
			userName: "Kirsten",
			email: "kirsten@mail.com",
			password: "123",
			name: "kirsten",
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