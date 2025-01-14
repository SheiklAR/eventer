import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import events from './data/events.js';


const PORT = process.env.PORT || 5000;

const app = express();

// Root Endpoint
app.get('/', (req, res) => {
    res.send("Api is running...");
});

app.get('/api/events', (req, res) => {
    res.json(events);
})

app.get('/api/events/:id', (req, res) => {
    const event = events.find((e) => e._id === req.params.id);
    res.json(event);
 })

// Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));