import mongoose from 'mongoose';

const connectDb = async () => {
  // mongoose gives us connect to connect to database..
  await mongoose.connect(process.env.MONGO_URL);
  console.log(`connected to database successfully!!`);
};

export default connectDb;
