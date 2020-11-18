require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require("axios").default;
const methodOverride = require('method-override');

//  setup ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static('public'));


// body parser middleware (this makes req.body work)
app.use(express.urlencoded({extended: false}))

//method override


// session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())


// middleware
app.use(flash())
 
app.use((req, res, next)=>{
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next()
})


// use controllers
app.use(methodOverride('_method'));
app.use('/auth', require('./controllers/auth.js'))
app.use('/recipes', require('./controllers/recipes.js'))
app.use('/favorites', require('./controllers/favorites.js'))
// app.use('/comments', require('./controllers/comments.js'))

// Home page
app.get('/', (req, res)=>{
  res.render('home')
})


// Profile page
app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
  })

//Vegan route
app.get('/vegan', (req, res)=>{
  var options = {
    method: 'GET',
    url: 'https://edamam-recipe-search.p.rapidapi.com/search',
    params: {q:'vegan'},
    headers: {
      'x-rapidapi-key': '110645db3emsh1beb6011bd85e24p13d962jsn34d6b5130ec7',
      'x-rapidapi-host': 'edamam-recipe-search.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
      console.log(response.data);
      let results = response.data.hits
      console.log(results)
        res.render('category/vegan', {result: results})
  }).catch(function (error) {
      console.error(error);
  });
})

//drinks route
app.get('/drinks', (req, res)=>{
  var options = {
    method: 'GET',
    url: 'https://edamam-recipe-search.p.rapidapi.com/search',
    params: {q:'drinks'},
    headers: {
      'x-rapidapi-key': '110645db3emsh1beb6011bd85e24p13d962jsn34d6b5130ec7',
      'x-rapidapi-host': 'edamam-recipe-search.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
      console.log(response.data);
      let results = response.data.hits
      console.log(results)
        res.render('category/drinks', {result: results})
  }).catch(function (error) {
      console.error(error);
  });
})

//Meat route
app.get('/meat', (req, res)=>{
  var options = {
    method: 'GET',
    url: 'https://edamam-recipe-search.p.rapidapi.com/search',
    params: {q:'meat'},
    headers: {
      'x-rapidapi-key': '110645db3emsh1beb6011bd85e24p13d962jsn34d6b5130ec7',
      'x-rapidapi-host': 'edamam-recipe-search.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
      console.log(response.data);
      let results = response.data.hits
      console.log(results)
        res.render('category/meat', {result: results})
  }).catch(function (error) {
      console.error(error);
  });
})

//Deserts route
app.get('/deserts', (req, res)=>{
  var options = {
    method: 'GET',
    url: 'https://edamam-recipe-search.p.rapidapi.com/search',
    params: {q:'deserts'},
    headers: {
      'x-rapidapi-key': '110645db3emsh1beb6011bd85e24p13d962jsn34d6b5130ec7',
      'x-rapidapi-host': 'edamam-recipe-search.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
      console.log(response.data);
      let results = response.data.hits
      console.log(results)
        res.render('category/deserts', {result: results})
  }).catch(function (error) {
      console.error(error);
  });
})


app.listen(process.env.PORT, () => {
    console.log('you\'re listening to the spooky sounds of port 8000')
})