const express = require('express');
const router = express.Router();
const axios = require('axios');
const isLoggedIn = require('../middleware/isLoggedIn')

// get route to get data from my api
router.get('/',isLoggedIn, (req, res)=>{
    var options = {
      method: 'GET',
      url: 'https://edamam-recipe-search.p.rapidapi.com/search',
      params: {q: req.query.q},
      headers: {
        'x-rapidapi-key': `${process.env.API_KEY}`,
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

module.exports = router;