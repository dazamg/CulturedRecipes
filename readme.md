# Delicious Recipes

### Demo App:


## Concept:
* A recipe search and diet app. A user suppose to be able to search for a recipe, see the intructions to that recipe and add it to their list

## Technologies Used:
* HTML
* CSS
* Express and nodejs
* PostgreSQL
* Sequelize

## Api
* https://rapidapi.com/edamam/api/recipe-search-and-diet/endpoints

## ERD
* https://lucid.app/documents/embeddedchart/5debda8c-17fb-41f7-a7d4-db867099fce6

#### Credits:
* Unsplash.com
* www.grabient.com
* lingojam.com
* stackoverflow.com
* mdn.com
* w2school.com

## Approach Taken
* What is the app minimal requirements:
* 


#### User stories
* User can be able to signUp or login into the website
* User can be able to search for a recipe
* User can be able to create a new recipe
* User can be able to add a recipe to their favourites
* User can be able to delete a recipe from their favourites list
* User can be able to comment on a recipe
* User can choose category/culture for a recipe

### Mvp
* Include sign up/log in functionality
* Have at least 2 models
* Incorporate at least one third-party API
* Have complete RESTful route
* Utilize an ORM to create a database table structure
* readme file

### Stretch goals
* Incorporate the diet data from the api into the app
* Add more categories 
* Do a more responsive web design styling


## Challenges
* Understanding my api and getting it to work
* The comment route
* Database and relations between models


# Deployment
* create a node app
* .gitingore
* install and set up express
* stubbed out the GET auth/login, GET auth/signup, POST auth/login, POST auth/signup
* configured auth controller
* set up ejs, express-ejs-layouts,

## Sequelize
* npm i sequelize pg
* sequelize init 
*sequelize db:create express_auth_dev

## 
1. Fork and clone

2. Install dependencies

3. Create a `config.json` with the following code:

{
  "development": {
    "database": "express_auth_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "express_auth_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "express_auth_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

**Note** If your database requires a username and password, you'll need to include these fields as well.

4. Create a database
```
sequelize db:create <insert db name here>

```

5. Migrate the `user` model to your database
```
sequelize db:migrate
```
6. ADD `SESSION_SECRET` and `PORT` environment variables in a `.env` file


| Crud  |          Route       |              Function                   | 
|-------|----------------------|-----------------------------------------|
| GET   |   /                  |           home page                     |
| GET   |   /auth/login        |           renders login page            | 
| POST  |   /auth/login        |           signs in existing user        | 
| GET   |   /auth/signup       |           renders sign up page          |
| POST  |   /auth/signup       |          creates new user in database   |
| GET   |   /auth/logout       |           logs out user                 |
| GET   |   /recipes           |           loads full recipes database   |
| GET   |   /favorites         |      loads user favorites database      |
| POST  |   /favorites         |  adds a recipe to the user favorite page|
| DELETE| /favorites/:id       |  deletes a recipe from the favorite page|
| GET   |favorites/:id/comments|       adds comment to individual recipe |
| PUT   |favorites/:id/comments|     edit a comment to individual recipe |
| Delete|favorites/:id/comments|    deletes comment to individual recipe |
| GET   |   /profile           |           user's profile page           |
| GET   |   /vegan             |     loads full vegan recipes database   |
| GET   |   /drinks            |     loads full drinks recipes database  |
| GET   |   /meat              |     loads full meat recipes database    |
| GET   |   /deserts           |     loads full deserts recipes database |


### Model

| Crud  |         Schema       |              Association                   | 
|----------|------------------------|---------------------------------------|
| recipe   | name,img_url,url,source| belongsToMany user through recipeuser hasMany comments|
|recipeuser|  userId,recipeId       |                                       |  
| comment  |name,content,recipeId,userId|  belongs to recipes and user      |          
|    user  | name,email,password    |     belongsToMany recipe through recipeuser hasMany comments| 

