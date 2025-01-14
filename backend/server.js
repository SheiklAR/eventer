import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import events from './data/events.js';
import connectDB from './config/db.js';
import router from './routes/eventRoutes.js';

connectDB();
const PORT = process.env.PORT || 5000;

const app = express();

// Root Endpoint
app.get('/', (req, res) => {
    res.send("Api is running...");
});

app.use('/api/events', router);


// Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));