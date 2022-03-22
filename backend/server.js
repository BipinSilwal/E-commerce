import app from './app.js';
import dotenv from 'dotenv';
import connectDb from './config/dbConnection.js';

// helps to configure environment file which are secret file not send in production mode..
dotenv.config({ path: 'backend/config/config.env' });

//connection with mongo database..
connectDb();

// process is global just like window in nodejs which can be accessed from any module.
app.listen(process.env.PORT, () => {
  console.log(
    `connected to port at ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
