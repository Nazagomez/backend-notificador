// src/config/socket.js
import { Server } from 'socket.io';

let io;

export function initSocket(server) {
	io = new Server(server, {
		cors: {
			origin: '*',
		},
	});

	io.on('connection', (socket) => {
		console.log('Client connected:', socket.id);

		socket.on('disconnect', () => {
			console.log('Client disconnected:', socket.id);
		});
	});
}

export function getIO() {
	if (!io) {
		throw new Error('Socket.io not initialized. Please call initSocket first.');
	}
	return io;
}
