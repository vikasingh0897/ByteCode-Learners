import cors from 'cors';
import express from 'express';

const app = express();

// Cors Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Basic Configuration
app.use(express.urlencoded({ limit: '16kb', extended: true }));
app.use(express.static('public'));
app.use(express.json({ limit: '16kb' }));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ByteCode Learners API is running!',
    timestamp: new Date().toISOString(),
  });
});

// Stats Route
import statsRouter from '../routes/stats.route.js';
app.use('/api/v1', statsRouter);

// Events Route
import eventsRouter from '../routes/events.route.js';
app.use('/api/v1', eventsRouter);

// Projects Route
import porjectRouter from '../routes/projects.route.js';
app.use('/api/v1', porjectRouter);

// Team Route
import teamRouter from '../routes/team.route.js';
app.use('/api/v1', teamRouter);

export default app;
