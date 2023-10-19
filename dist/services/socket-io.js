"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpSocketIO = void 0;
const socket_io_1 = require("socket.io");
const setUpSocketIO = (server) => {
    const io = new socket_io_1.Server(server, {
        path: '/socket',
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        },
    });
    console.log(12);
    io.on('connect', (socket) => {
        console.log('Driver connected:', socket.id);
        socket.on("test", () => {
            console.log("Received test event from client");
        });
        socket.on('locationUpdate', (data) => {
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
exports.setUpSocketIO = setUpSocketIO;
