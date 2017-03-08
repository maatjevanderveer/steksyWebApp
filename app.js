const express = require ('express')
const Sequelize = require ('sequelize')
const bodyParser = require ('body-parser')
const app = express ()
const session = require('express-session')


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

app.get('/signup', function (request, response){
	response.render('signup')
})

app.get('/addplant', function (request, response){
	response.render('signup')
})





app.listen(3000, function(){
	console.log("The server has started")
})