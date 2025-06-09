import NotFoundError from '../errors/notFoundError.js';
import { Notification } from '../models/index.js';

const notificationService = {
	create: async (notificationData) => {
		try {
			const notification = await Notification.create(notificationData);
			return notification;
		} catch (error) {
			throw error;
		}
	},

	getAll: async () => {
		try {
			const notifications = await Notification.findAll();
			return notifications;
		} catch (error) {
			throw error;
		}
	},

	getById: async (id) => {
		try {
			const notification = await Notification.findByPk(id);
			if (!notification) {
				throw new NotFoundError('Notification', id);
			}
			return notification;
		} catch (error) {
			throw error;
		}
	},

	update: async (id, notificationData) => {
		try {
			const notification = await Notification.findByPk(id);
			if (!notification) {
				throw new NotFoundError('Notification', id);
			}
			await notification.update(notificationData);
			return notification;
		} catch (error) {
			throw error;
		}
	},

	delete: async (id) => {
		try {
			const notification = await Notification.findByPk(id);
			if (!notification) {
				throw new NotFoundError('Notification', id);
			}
			await notification.destroy();
			return { message: 'Notification deleted successfully' };
		} catch (error) {
			throw error;
		}
	},
};

export default notificationService;
