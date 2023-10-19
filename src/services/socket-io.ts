import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";

export const setUpSocketIO = (server: HttpServer): void => {
    const io: SocketIOServer = new SocketIOServer(server, {
        path: '/socket',
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        },
    });

    console.log(12)



    io.on('connect', (socket: Socket) => {
        console.log('Driver connected:', socket.id);

        socket.on("test", () => {
            console.log("Received test event from client");
        });

        socket.on('locationUpdate', (data: any) => {
            console.log(`Location update from driver (${socket.id}):`, data);

        });

        socket.on('disconnect', () => {
            console.log('Driver disconnected:', socket.id);
        });
    });

    io.on('error', (error) => {
        console.error('Socket.IO error:', error);
    });
};
