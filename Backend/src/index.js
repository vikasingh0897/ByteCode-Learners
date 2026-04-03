import dotenv from 'dotenv/config';
import app from './app.js';
import connectDB from '../db/connection.js';

// Port
const PORT = process.env.PORT || 5000;

// DB Connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listenning on https://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MONGODB connection failed: ', error);
    process.exit(1);
  });
