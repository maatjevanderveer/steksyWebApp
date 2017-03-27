const express = require ('express')
const Sequelize = require ('sequelize')
const bodyParser = require ('body-parser')
const app = express ()
const session = require('express-session')
const db = require(__dirname + '/models/db.js')

//setting view folder and view engine
app.set('views','./views');
app.set('view engine', 'pug');
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to ssupport URL-encoded bodies
	extended: false
})); 

// MIDDLEWARE
app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

app.use(express.static('static'));

// ROUTES

// LOGOUT
app.get('/logout', function (request, response) {
	if (request.session.user) {
		request.session.destroy(function(){
			response.redirect('/');
		});
	} else {
		response.redirect("/login");
	}
});

// ALL PLANTS
app.get('/offers', (request, response) => {

	user = request.session.user
	if(user === undefined) {
		response.redirect('/')
	}
	else {

		
		db.Plant.findAll(

		{
			include: [db.User]
		}
		).then((allPlants) => {
			console.log("hier onder lezen")
			console.log(allPlants)
			console.log(allPlants[0].dataValues)
			const addresses = []
			for (var i = 0; i < allPlants.length; i++) {
				const address = allPlants[i].user.address + " " + allPlants[i].user.houseNumber + ", " + allPlants[i].user.city + ", The Netherlands"
				addresses.push(address)
			}

			response.render('offers',
			{
				allPlants: allPlants,
				name: request.session.user.userName,
				addresses: JSON.stringify(addresses)
			})
		})
	}
})


// HOME
app.get('/', function (request, response){
	console.log('redirected to /');
	console.log('request.session')
	console.log(request.session)
	response.render('index',
	{
		user: request.session.user
	});
})

// LOG IN
app.get('/login', function (request, response){
	response.render('login', {
		user: request.session.user
	});
})

app.post('/login', function(request, response){
	console.log("hallo ik doe het")
	if(request.body.email.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your email address."));
		return;
	}

	if(request.body.password.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your password."));
		return;
	}
	db.User.findOne({
		where:{
			email: request.body.email
		}
	}).then(function(user){
		console.log(user)
		if (user !== null && request.body.password === user.password){
			request.session.user = user; // very important :)
			response.redirect('/offers');
		} else {
			response.redirect('/?message'+ encodeURIComponent("Invalid email or password"));
		}
	}, function (error){
		response.redirect('/?message'+ encodeURIComponent("Invalid email or password"));
	});
});

// SIGN UP
app.get('/signup', function (request, response){
	response.render('signup')
});

app.post('/signup', function(request, response){
	db.User.create({
		name: request.body.name,
		userName: request.body.userName,
		email: request.body.email,
		password: request.body.password,
		adress: request.body.adress,
		houseNumber: request.body.houseNumber,
		zipcode: request.body.zipcode,
		city: request.body.city
	}).then(function(){
		response.redirect("/login")
	})
	console.log('ik werk')
})


// app.get('/offers', function (request, response){
// 	response.render('offers')
// })

// app.get('/addplant', function (request, response){
// 	response.render('signup')
// })

// ADD PLANT
app.get('/addplant', function (request, response) {
	user = request.session.user
	if(user === undefined) {
		response.redirect('/')
	}
	else {
		response.render('addplant')
	}
})

app.post('/newplant', bodyParser.urlencoded({extended: true}), function(request, response) {
	console.log(request.session)
	db.Plant.create({
		plantName: request.body.newPlantName,
		description: request.body.newDescription,
		userId: request.session.user.id
	}).then( (newPlant) =>{
		console.log(newPlant)
		response.redirect('/offers')
	})
    // connect to database
    // 
})


// VIEW A SPECIFIC PLANT
app.get('/grabplant', (request, response) => {
    console.log(request.query.id)
    user = request.session.user;
    db.Plant.findOne({
        where: {
            id: request.query.id
        },    
		include: [db.User]
    })
    .then((onePlant) => {
        console.log('this logges data of specific post')
        console.log(onePlant)
        response.render('grabplant', {
        	onePlant:onePlant})
    })
})


app.listen(3000, function(){
	console.log("The server has started")
})