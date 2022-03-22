import express from 'express';
import morgan from 'morgan';
import errorHandlerMiddleware from '../middleware/errorMiddleware.js';

// this package helps us to get rid of writing try-catch all time in controller.
// also helps to get our error passed to errorMiddleware..
import 'express-async-errors';
// app is an object created from express. which contains method & properties
const app = express();

// middleware

if (process.env.NODE_ENV !== 'PRODUCTION') {
  // morgan to get http method, and routes,and network status
  app.use(morgan('dev'));
}
app.use(express.json()); // when json is send from the user it helps to get those json-data in the server..

// all imported Routes here.
import productRouter from './routes/productRouter.js';

//app.use global middleware called every time request is send to the server.
// use knows which http method is being requested.. there is no specify of method.
// callback function are route handler which handle request send in url.

//global middleware with url path and route.
app.use('/api/v1', productRouter);

app.use(errorHandlerMiddleware);

export default app;
