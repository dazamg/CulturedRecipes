var db = require('./models')
console.log(db.comment)
// db.comment.findOrCreate({  
//   where: {
    //   userId: req.body.user
    // name: 'Paul Allen',
    // content: 'This is really neat! Thanks for posting.',
    // recipeId: 1
//   },
// }).then(([comment, created]) =>{
//   console.log(comment.get())
// });