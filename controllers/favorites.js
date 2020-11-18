const express = require('express');
const router = express.Router();
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn')



// Favorites route
router.get('/',isLoggedIn, (req, res) =>{
  // TODO: Get all records from the DB and render to view
  db.user.findOne({
    where: {id: req.user.id},
    include: [db.recipe, db.comment]
  })
  .then(user =>{
    console.log(user)
      res.render('favorites', {favorites: user.recipes})
  })
  .catch((error) => {
      console.log(error)
  }) 
})

//Favorites post route
router.post('/',isLoggedIn, (req, res) =>{
  // TODO: Get form data and add a new record to DB
  console.log("Yep it work\s", req.body)
  db.recipe.findOrCreate({
    where: {
      name: req.body.name,
      img_url: req.body.img_url,
      source: req.body.source,
      url: req.body.url    
    },
    include: [db.user] 
  })
  .then(([recipe, created])=>{
    req.user.addRecipe(recipe).then(newRelation=>{
      res.redirect('/favorites')
    })
  })
  .catch(err => {
      console.log('Something went wrong', err)
  })
});


// delete a recipe from the favorite page
router.delete('/:id',isLoggedIn, (req, res) =>{
db.recipe.destroy({
  where: {id: req.params.id},
})
.then(numRowsDeleted=>{
  console.log(numRowsDeleted)
  res.redirect('/favorites')
})
.catch(err=> {
  console.log('oops', err)
})
})


// gets all the comments and render it to the comments show page
router.get('/:id/comments', isLoggedIn, (req, res) =>{
  db.comment.findAll({
    where: {userId: req.user.id,
      recipeId: req.params.id},
      include: [db.user] 
  })
  .then(foundComments =>{
    res.render('comments', {comments: foundComments})
  })
})

// Creates a new comment
router.post('/:id/comment',isLoggedIn, (req,res)=> {
  console.log("Adding a comment")
  db.comment.create({
          userId: req.user.id,
          content: req.body.content,
          recipeId: req.params.id, 
          include: [db.user] 
  })
  .then(commentcreated =>{
      console.log('Hey', commentcreated)
      res.redirect(`/favorites/${req.params.id}/comments`)
  })
  .catch(err => {
      console.log('Something went wrong', err)
  })
})


//Deletes a comment from the comment page
router.delete('/:id/comment',isLoggedIn, (req, res) =>{
  // TODO: Get form data and remove a record from DB
db.comment.destroy({
  where: {id: req.params.id},
})
.then(numRowsDeleted=>{
  console.log(numRowsDeleted)
  res.redirect('/favorites')
})
.catch(err=> {
  console.log('oops', err)
})
})

// Edit/update a comment from the comment page
router.put('/:id/comment', async (req, res, next) => {
  let recipeComment = await db.comment.findByPk(req.params.id).catch(e => {
      console.log(e.message)
      res.redirect(`/favorites/${req.params.id}/comments`) // this is redirecting in case of a catch error
  })
  if (!recipeComment){
      console.log("err")
      res.redirect(`/favorites/${req.params.id}/comments`) // this is redirecting in case of a catch error
  }
  recipeComment.content = req.body.content
  recipeComment.save()
  res.redirect('/favorites')
})


module.exports = router;