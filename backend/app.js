import express from 'express';

// app is an object created from express. which contains method & properties
const app = express();

// all imported Routes here.
import productRouter from './routes/productRouter.js';

//app.use global middleware called every time request is send to the server.
// use knows which http method is being requested.. there is no specify of method.
// callback function are route handler which handle request send in url.

//global middleware with url path and route.
app.use('/api/v1', productRouter);

export default app;
