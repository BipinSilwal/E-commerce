import app from './app.js';
import dotenv from 'dotenv';
import connectDb from './config/dbConnection.js';

// handle Uncaught exceptions.
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down  due to uncaught Exception`);
  process.exit(1);
});

// helps to configure environment file which are secret file not send in production mode..
dotenv.config({ path: 'backend/config/config.env' });

//connection with mongo database..
connectDb();

// process is global just like window in nodejs which can be accessed from any module.
const server = app.listen(process.env.PORT, () => {
  console.log(
    `connected to port at ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

// Hanlde Unhandled Promise rejections

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to Unhandled Promise rejection`);
  server.close(() => process.exit(1));
});
