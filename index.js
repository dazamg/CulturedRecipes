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

// Home page
app.get('/', (req, res)=>{
  res.render('home')
})

app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
  })

app.listen(process.env.PORT, () => {
    console.log('you\'re listening to the spooky sounds of port 8000')
})