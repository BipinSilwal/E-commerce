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
process is global so can access from any where

//Nodemon
 
 we install nodemon in development mode
yarn add --dev packageName for development mode
after installing nodemon we add 
script with start : node backend/server.js
script with dev: SET_ENV=DEVELOPMENT& nodemon backend/server
script with prod: SET_ENV=PRODUCTION& nodemon backend/server

yarn run and script name to run it..

