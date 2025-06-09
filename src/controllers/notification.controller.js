import notificationService from '../services/notification.service.js';

const notificationController = {
	sendNotification: async (req, res, next) => {
		try {
			const notification = await notificationService.create(req.body);
			notificationService.emitNotification(notification);
			res.status(200).json({ message: 'Notification sent successfully', notification });
		} catch (error) {
			next(error);
		}
	},

	getAll: async (req, res, next) => {
		try {
			const notifications = await notificationService.getAll();
			res.status(200).json(notifications);
		} catch (error) {
			next(error);
		}
	},

	getById: async (req, res, next) => {
		try {
			const notification = await notificationService.getById(req.params.id);
			res.status(200).json(notification);
		} catch (error) {
			next(error);
		}
	},

	update: async (req, res, next) => {
		try {
			const notification = await notificationService.update(req.params.id, req.body);
			res.status(200).json(notification);
		} catch (error) {
			next(error);
		}
	},

	delete: async (req, res, next) => {
		try {
			const response = await notificationService.delete(req.params.id);
			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	},
};

export default notificationController;
