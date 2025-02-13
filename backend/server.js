import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import eventRouter from './routes/eventRoutes.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';


connectDB();
const PORT = process.env.PORT || 5000;

const app = express();

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie-parser middleware
app.use(cookieParser())

  
// Root Endpoint
app.get('/', (req, res) => {
    res.send("Api is running...");
});

app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);

// 404 Error Handling
app.use((req, res, next) => {
    res.status(404).send({ message: "Endpoint not found" });
});

// Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));