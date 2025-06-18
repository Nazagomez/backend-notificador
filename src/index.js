/**
 * @fileOverview This file contains the main server code for the backend application.
 * It initializes the Express server, establishes a connection to the database,
 * sets up middleware, defines routes, and starts the server.
 * @module index.js
 */

//Node.js imports
import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

//config imports
import { dbConnect } from './config/db.js';
import swaggerOptions from './config/swagger.js';
import { initSocket } from './config/socket.js';

//Middleware imports
import errorHandler from './middlewares/errorHandler.js';
import requireJson from './middlewares/contentType.js';

//Route imports
import { userRouter, eventRouter, notificationRouter, authRouter } from './routes/index.js';

//Jobs
import './jobs/eventStatusUpdater.js';

//creating an instance of the Express server
const app = express();
const server = createServer(app);

//setting up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(requireJson);

//testing the database connection
await dbConnect();

//Routes

app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/auth', authRouter);

//Swagger documentation setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//catch-all routes not found
app.use((req, res, next) => {
	res.status(404).json({
		error: 'Endpoint not found',
		message: `The resource ${req.originalUrl} was not found`,
	});
});

//error handling middleware
app.use(errorHandler);

//Socket.io initialization
initSocket(server);

//starting the server
const port = process.env.PORT || 4000;
server.listen(port, () => {
	console.log('\x1b[32m%s\x1b[0m', `Server started. The server is listen on http://localhost:${port}`);
	console.log('\x1b[32m%s\x1b[0m', `Documentation Swagger in http://localhost:${port}/api-docs`);
});
