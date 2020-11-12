const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');

// router.get('/', (req, res) =>{
//     res.render('home')
// })

router.get('/', (req, res)=>{
    db.recipe.findOrCreate()
    var options = {
      method: 'GET',
      url: 'https://edamam-recipe-search.p.rapidapi.com/search',
      params: {q: req.query.q},
      headers: {
        'x-rapidapi-key': '110645db3emsh1beb6011bd85e24p13d962jsn34d6b5130ec7',
        'x-rapidapi-host': 'edamam-recipe-search.p.rapidapi.com'
      }
    };
  
    axios.request(options).then(function (response) {
        console.log(response.data);
        let results = response.data.hits
        console.log(results)
          res.render('recipes', {result: results})
    }).catch(function (error) {
        console.error(error);
    });
  })
//   router.get('/', function(req, res) {
//     // TODO: Get all records from the DB and render to view
//     db.recipes.findAll()
//     .then(favorites => {
  
//       res.render('recipes', {recipes: favorites, showButton: false});
//     })
//     .catch(err => {
//       console.log('Oops', err)
//     })
//   });

// POST /recipe - receive the name of a recipe and add it to the database
// router.post('/', function(req, res) {
//     // TODO: Get form data and add a new record to DB
//     db.recipe.findOrCreate({
//       where: {name: req.body.name},
//       defaults: {name: req.body.name}
//     })
//     .then (([created, wasCreated])=> {
//       res.redirect('/pokemon')
//     })
//     .catch(err => {
//       console.log('Something went wrong', err)
//     })
//   });
router.get('/favorites', (req, res) =>{
    console.log(favorites)
    res.render('favorites')
})

module.exports = router;