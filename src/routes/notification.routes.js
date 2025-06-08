import { Router } from 'express';
import notificationController from '../controllers/notification.controller.js';

const notificationRouter = Router();

notificationRouter.post('/', notificationController.create);
notificationRouter.get('/', notificationController.getAll);
notificationRouter.get('/:id', notificationController.getById);
notificationRouter.put('/:id', notificationController.update);
notificationRouter.delete('/:id', notificationController.delete);

export default notificationRouter;