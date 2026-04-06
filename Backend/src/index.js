import dotenv from 'dotenv/config';
import app from './app.js';
import connectDB from '../db/connection.js';

connectDB()
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((error) => {
    console.error('MONGODB connection failed: ', error);
  });

// 2. Handle Local Development vs Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
}

export default app;
