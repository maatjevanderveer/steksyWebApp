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

// // SET UP CONNECTION WITH DATABASE
// var db = new Sequelize ('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/steksy');

// // TESTING DATABASE CONNECTION
// db
// .authenticate()
// .then(function(err) {
// 	console.log('Connection has been established successfully.');
// }, function (err) {
// 	console.log('Unable to connect to the database:', err);
// });






app.use(express.static('static'));

app.get('/', function (request, response){
	response.render('index')
})

app.get('/login', function (request, response){
	response.render('login')
})

app.post('/login', function(request, response){
	User.findOne({
		where:{
			email: request.body.email
		}
		.then(function(user){
			console.log(user)
		})
	})
})

app.get('/signup', function (request, response){
	response.render('signup')
})

app.get('/addplant', function (request, response){
	response.render('signup')
})





app.listen(3000, function(){
	console.log("The server has started")
})