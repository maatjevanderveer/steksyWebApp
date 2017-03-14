const express = require ('express')
const Sequelize = require ('sequelize')
const bodyParser = require ('body-parser')
const app = express ()
const session = require('express-session')


//setting view folder and view engine
app.set('views','./views');
app.set('view engine', 'pug');
app.use(bodyParser.json() );       // to support JSON-encoded bodies
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
    db.Post.create({
        title: request.body.newPlantName,
        body: request.body.newBody,
        userId: request.session.user.id

    }).then( (newPlant) =>{
        console.log(newPlant)
        response.redirect('/offers')
    })
    // connect to database
    // 
})

// ALL PLANTS
app.get('/offers', (request, response) => {
    user = request.session.user
    if(user === undefined) {
        response.redirect('/')
    }
    else {
        db.Post.findAll()
        .then((allPlants) => {
            console.log(allPlants[0].dataValues)
            response.render('allPlants', {allPlants:allPlants})
        })
    }
})


app.listen(3000, function(){
	console.log("The server has started")
})