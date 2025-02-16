import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { createServer } from 'http';
import connectDB from './backend/config/db.js';
import eventRouter from './backend/routes/eventRoutes.js';
import userRouter from './backend/routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import connectWebSocket from './backend/config/websocket.js';
import path from 'path';


connectDB();

const PORT = process.env.PORT || 5000;
const app = express();
const server = createServer(app); // Add the server to the websocket server

// Web Socket Conn
connectWebSocket(server);

// json parser
app.use(express.json());
// cookie-parser middleware
app.use(cookieParser())

// // Root Endpoint
// app.get('/', (req, res) => {
//     res.send("Api is running...");
// });

app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);



const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    // Set static file
    app.use(express.static(path.join(__dirname, 'frontend/dist')));
    
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    )
} else {
    // Root Endpoint
    app.get('/', (req, res) => {
        res.send("Api is running...");
    });
};


// 404 Error Handling
app.use((req, res, next) => {
    res.status(404).send({ message: "Endpoint not found" });
});
// Start Server
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Start web socket server
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));