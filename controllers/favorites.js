const express = require('express');
const router = express.Router();
// const axios = require('axios');
const db = require('../models');

// Favorites route
router.get('/', (req, res) =>{
  // TODO: Get all records from the DB and render to view
  db.recipe.findAll()
  .then(favorites =>{
      res.render('favorites', {favorites: favorites})
  })
  .catch((error) => {
      console.log(error)
  }) 
})

//Favorites post route
router.post('/', (req, res) =>{
  // TODO: Get form data and add a new record to DB
  console.log("Yep it work\s", req.body)
  db.recipe.findOrCreate({
    where: {
      name: req.body.name,
      img_url: req.body.img_url,
    },
    // include: [db.user]
  })
  .then(([recipe, created])=>{
    db.user.findOne({
        where: {id: req.session.passport.user}
    }).then(user=>{
        user.addRecipe(recipe)
        console.log('User ' + user.name + ' favorited ' + recipe.name);
    })
    res.redirect('favorites')
})
  .catch(err => {
      console.log('Something went wrong', err)
  })
  });

  // Delete route
// router.get('/:idx', (req, res)=>{
//   var options = {
//     method: 'GET',
//     url: 'https://edamam-recipe-search.p.rapidapi.com/search',
//     params: {q: req.query.q},
//     headers: {
//       'x-rapidapi-key': '110645db3emsh1beb6011bd85e24p13d962jsn34d6b5130ec7',
//       'x-rapidapi-host': 'edamam-recipe-search.p.rapidapi.com'
//     }
//   };
//   console.log("Helle", options)
  
//   axios.request(options).then(function (response) {
//       // console.log(response.data);
//       let results = response.data
//       console.log(results)
//         res.render('show', {result: results})
//   }).catch(function (error) {
//       console.error(error);
//   });
// })

//   router.delete('/:idx', function(req, res) {
//     // TODO: Get form data and remove a record from DB
//     db.recipe.destroy({
//       where: {id: req.params.idx},
//     })
//     .then(numRowsDeleted=>{
//       console.log(numRowsDeleted)
//       res.redirect('/favorites')
//     })
//     .catch(err=> {
//       console.log('oops', err)
//     })
// })
module.exports = router;