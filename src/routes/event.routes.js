import { Router } from 'express';
import eventController from '../controllers/event.controller.js';

const eventRouter = Router();

eventRouter.post('/', eventController.create);
eventRouter.get('/', eventController.getAll);
eventRouter.get('/:id', eventController.getById);
eventRouter.put('/:id', eventController.update);
eventRouter.delete('/:id', eventController.delete);

export default eventRouter;