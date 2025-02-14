import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import eventRouter from './routes/eventRoutes.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';


connectDB();

const PORT = process.env.PORT || 5000;
const app = express();
const server = createServer(app); // Add the server to the websocket server

// Web socket server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Match your frontend URL
        methods: ["GET", "POST"],
        credentials: true// To allow request from different origin (frontend)
    },
});


// Store active viewers count
let activeViewers = 0

// Switch on the connection
io.on("connection", (socket) => {
    console.log('a user connected');
    // viewers count
    io.emit('updateViewers', activeViewers);
    
    socket.on('joinLive', () => {
        activeViewers++;
        io.emit('updateViewers', activeViewers);
        console.log(`User joined. Viewers: ${activeViewers}`);
    });

    socket.on('leaveLive', () => {
        if (activeViewers > 0) {
            activeViewers--;
        }
        io.emit('updateViewers', activeViewers);
        console.log(`User left. Viewers: ${activeViewers}`);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
        if (activeViewers > 0) {
            activeViewers--;
        }
        io.emit('updateViewers', activeViewers);
    });
});


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
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Start web socket server
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));