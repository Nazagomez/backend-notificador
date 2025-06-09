import NotFoundError from '../errors/notFoundError.js';
import { Event } from '../models/index.js';

const eventService = {
	create: async (eventData) => {
		try {
			const event = await Event.create(eventData);
			return event;
		} catch (error) {
			throw error;
		}
	},

	getAll: async () => {
		try {
			const events = await Event.findAll();
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
			await event.update(eventData);
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
};

export default eventService;
