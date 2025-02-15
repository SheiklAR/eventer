import dotenv from 'dotenv';
dotenv.config();
import { Server } from 'socket.io';

const connectWebSocket = (server) => {
    // Web socket server
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:3000", process.env.RENDER_URL], // Match your frontend URL
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

};



export default connectWebSocket;