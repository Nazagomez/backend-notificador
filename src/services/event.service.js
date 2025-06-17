import { Op } from 'sequelize';
import NotFoundError from '../errors/notFoundError.js';
import { Event, User } from '../models/index.js';
import ForbiddenError from '../errors/forbiddenError.js';
import notificationService from './notification.service.js';

const eventService = {
	create: async (eventData) => {
		try {
			const event = await Event.create(eventData);
			return event;
		} catch (error) {
			throw error;
		}
	},

	getAll: async ({ page = 0, size = 20 }) => {
		try {
			const offset = page * size;
			const limit = size;

			const events = await Event.findAll({
				where: {
					state: {
						[Op.ne]: 'completed',
					},
				},
				offset,
				limit,
				order: [['date', 'ASC']],
			});

			for (const event of events) {
				const count = await event.countFollowers();
				event.setDataValue('attendeesCount', count);
			}

			return events;
		} catch (error) {
			throw error;
		}
	},

	getById: async (id) => {
		try {
			const event = await Event.findByPk(id);
			if (!event) {
				throw new NotFoundError('Event', id);
			}

			const count = await event.countFollowers();
			event.setDataValue('attendeesCount', count);

			return event;
		} catch (error) {
			throw error;
		}
	},

	update: async (id, eventData) => {
		try {
			const event = await Event.findByPk(id);
			if (!event) {
				throw new NotFoundError('Event', id);
			}

			const originalValues = { ...event.dataValues };

			await event.update(eventData);
			const changedFields = [];

			for (const key of Object.keys(eventData)) {
				if (originalValues[key] !== event[key]) {
					changedFields.push(key);
				}
			}

			if (changedFields.length > 0) {
				const notificationData = {
					title: `${originalValues.title} | Event Updated`,
					message: `Updated fields: ${changedFields.join(', ')}`,
					EventId: event.id,
					UserId: eventData.UserId,
				};

				const notification = await notificationService.create(notificationData);
				notificationService.emitNotification(notification);
			}
			return event;
		} catch (error) {
			throw error;
		}
	},

	delete: async (id) => {
		try {
			const event = await Event.findByPk(id);
			if (!event) {
				throw new NotFoundError('Event', id);
			}
			await event.destroy();
			return { message: 'Event deleted successfully' };
		} catch (error) {
			throw error;
		}
	},

	registerAttendance: async (id, userId) => {
		try {
			const event = await Event.findByPk(id);
			if (!event) {
				throw new NotFoundError('Event', id);
			}

			const count = await event.countFollowers();

			if (count === event.capacity) {
				throw new ForbiddenError(
					'attend event',
					'This event has reached its maximum capacity. You cannot register as an attendee.',
				);
			}

			const user = await User.findByPk(userId);
			if (!user) {
				throw new NotFoundError('User', userId);
			}

			await event.addFollower(user);

			return { message: 'Attendance registered successfully' };
		} catch (error) {
			throw error;
		}
	},

	cancelAttendance: async (id, userId) => {
		try {
			const event = await Event.findByPk(id);
			if (!event) {
				throw new NotFoundError('Event', id);
			}

			const user = await User.findByPk(userId);
			if (!user) {
				throw new NotFoundError('User', userId);
			}

			await event.removeFollower(user);

			return { message: 'Attendance canceled successfully' };
		} catch (error) {
			throw error;
		}
	},

	hasUserRegisteredAttendance: async (id, userId) => {
		try {
			const event = await Event.findByPk(id);
			if (!event) {
				throw new NotFoundError('Event', id);
			}

			const user = await User.findByPk(userId);
			if (!user) {
				throw new NotFoundError('User', userId);
			}

			const attending = await event.hasFollower(user);

			return { attending };
		} catch (error) {
			throw error;
		}
	},
};

export default eventService;
