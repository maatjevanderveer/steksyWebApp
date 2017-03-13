const express = require ('express')
const Sequelize = require ('sequelize')
const bodyParser = require ('body-parser')
const app = express ()
const session = require('express-session')
const db = require(__dirname + '/models/db.js')



//setting view folder and view engine
app.set('views','./views');
app.set('view engine', 'pug');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to ssupport URL-encoded bodies
	extended: false
})); 








app.use(express.static('static'));

app.get('/', function (request, response){
	response.render('index')
})

app.get('/login', function (request, response){
	response.render('login')
})

app.post('/login', function(request, response){
	console.log("hallo ik doe het")
	db.User.findOne({
		where:{
			email: request.body.email
		}
	}).then(function(user){
		console.log(user)
		if (user !== null && request.body.password === user.password){
			response.redirect('/offers')
		} else {
			response.redirect('/?message'+ encodeURIComponent("Invalid email or password"));
		}
	}, function (error){
		response.redirect('/?message'+ encodeURIComponent("Invalid email or password"));
	});
});








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


app.get('/offers', function (request, response){
	response.render('offers')
})

app.get('/addplant', function (request, response){
	response.render('signup')
})





app.listen(3000, function(){
	console.log("The server has started")
})