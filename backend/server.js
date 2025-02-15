import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { createServer } from 'http';
import connectDB from './config/db.js';
import eventRouter from './routes/eventRoutes.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import connectWebSocket from './config/websocket.js';
import path from 'path';


connectDB();

const PORT = process.env.PORT || 5000;
const app = express();
const server = createServer(app); // Add the server to the websocket server

// Web Socket Conn
connectWebSocket(server);

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

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    // Set static file
    app.use(express.static(path.join(__dirname, 'frontend/build')));

    
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
};

// Start Server
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Start web socket server
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));