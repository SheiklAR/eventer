import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import events from './data/events.js';
import connectDB from './config/db.js';
import eventRouter from './routes/eventRoutes.js';
import userRouter from './routes/userRoutes.js';

connectDB();
const PORT = process.env.PORT || 5000;

const app = express();

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Endpoint
app.get('/', (req, res) => {
    res.send("Api is running...");
});

app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);


// Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));