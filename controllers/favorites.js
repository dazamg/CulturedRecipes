const express = require('express');
const router = express.Router();
// const axios = require('axios');
const db = require('../models');

// router.get('/', function(req, res) {
//     // TODO: Get all records from the DB and render to view
//     db.user.findOne()
//     .then(favorites => {
  
//       res.render('favs', {recipes: favorites, showButton: false});
//     })
//     .catch(err => {
//       console.log('Oops', err)
//     })
//   });

// // POST /recipe - receive the name of a recipe and add it to the database
// router.post('/', function(req, res) {
//     // TODO: Get form data and add a new record to DB
//     db.user.findOrCreate({
//       where: {name: req.body.name},
//       include: [db.recipe]
//     })
//     .then (([created, wasCreated])=> {
//       res.redirect('/favs')
//     })
//     .catch(err => {
//       console.log('Something went wrong', err)
//     })
//   });
// router.get('/faves', function(req, res) {
//     // TODO: Get all records from the DB and render to view
//     db.recipe.findAll()
//     .then(favorites =>{
//         res.render('faves', {favorites: favorites})
//     })
//     .catch((error) => {
//       console.log(error)
//     }) 
//   })

router.get('/favorites', (req, res) =>{
  res.render('favorites')
})