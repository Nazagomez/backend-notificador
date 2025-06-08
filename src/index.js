/**
 * @fileOverview This file contains the main server code for the backend application.
 * It initializes the Express server, establishes a connection to the database,
 * sets up middleware, defines routes, and starts the server.
 * @module index.js
 */

//Node.js imports
import express from 'express';
import cors from 'cors';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

//config imports
import { dbConnect } from './config/db.js';
import swaggerOptions from './config/swagger.js';

import {
  userRouter,
  eventRouter,
  notificationRouter,
} from './routes/index.js';

//creating an instance of the Express server
const app = express();

//setting up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//testing the database connection
await dbConnect();

//Routes
app.get('/', (req, res) => {
	res.status(200).json({
		message: "Welcome to the backend application",
		version: "1.0.0",
		documentation: `http://localhost:${port || 4000}/api-docs`,
	});
});
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);
app.use('/api/notifications', notificationRouter);

//Swagger documentation setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//catch-all routes not found
app.use((req, res, next) => {
    res.status(404).json({
        error: "Not found",
        message: `The resource ${req.originalUrl} was not found`,
    });
});

//starting the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(
        "\x1b[32m%s\x1b[0m",
        `Server started. The server is listen on http://localhost:${port}`
    );

	console.log(
		"\x1b[32m%s\x1b[0m",
		`Documentation Swagger in http://localhost:${port}/api-docs`
	);
});