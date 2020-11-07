# Express Auth Boilerplate

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

7. 