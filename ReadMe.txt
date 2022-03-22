Install nodejs Yarn.
Yarn init to get package.json for backend
Install express, mongoose, dotenv
express framework provide http, router
mongoose provide schema for mongodatabase.
dotenv for config the environment file..
write "type":"module" in package.json file.

// express

while importing don't forgot to add .js extension.

import express
add server.js file to import app file.
listen port using dotenv
dotenv gives method config()
we write path in config({path:dirname of environment file})
process is global so can access it from any where

//Nodemon
 
 we install nodemon in development mode
yarn add --dev packageName for development mode
after installing nodemon we add 
script with start : node backend/server.js
script with dev: SET_ENV=DEVELOPMENT& nodemon backend/server
script with prod: SET_ENV=PRODUCTION& nodemon backend/server

yarn run and script name to run it..

//Routes

express give us http method to use.
CRUD: create(post), read(get), update(put, patch), delete
using CRUD operation gives us two options in argument, url and callback function

example: app.get('/', (req,res,next)=>{})
            get is http method
            '/' is url
            function is callback function or middleware which get three options
            req,res and next.
            next helps us to get to other middleware.
            req is what we get from user,
            res is what we response to the user..

//app.use global middleware called every time request is send to the server.
// "app.use" knows which http method is being requested..

// we use express.Router() to chain route and http method with route handler
// we create route handler in controller folder and it send back json value.