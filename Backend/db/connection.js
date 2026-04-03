import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`);
    console.log('DB connection Successfull!');
  } catch (error) {
    console.error('MONGODB connection FAILED: ', error);
    process.exit(1);
  }
};

export default connectDB;
