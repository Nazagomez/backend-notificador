import NotFoundError from '../errors/notFoundError.js';
import { Event, Notification } from '../models/index.js';
import { getIO } from '../config/socket.js';
import { Op } from 'sequelize';

const notificationService = {
	create: async (notificationData) => {
		try {
			const notification = await Notification.create(notificationData);

			const event = await notification.getEvent();
			notification.setDataValue('eventTitle', event.title);

			return notification;
		} catch (error) {
			throw error;
		}
	},

	getAll: async () => {
		try {
			const notifications = await Notification.findAll({
				include: {
					model: Event,
					attributes: ['title'],
					where: {
						state: {
							[Op.ne]: 'completed',
						},
					},
				},
				order: [['createdAt', 'DESC']],
			});
			notifications.forEach((notification) => {
				notification.setDataValue('eventTitle', notification.Event.title);
			});
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

	emitNotification: (notification) => {
		const io = getIO();
		if (!io) {
			throw new Error('Socket.io not initialized. Please call initSocket first.');
		}
		io.emit('notification', notification);
	},
};

export default notificationService;
