import eventService from '../services/event.service.js';

const eventController = {
	create: async (req, res, next) => {
		try {
			const event = await eventService.create(req.body);
			res.status(201).json(event);
		} catch (error) {
			next(error);
		}
	},

	getAll: async (req, res, next) => {
		try {
			const page = parseInt(req.query.page, 10) || 0;
			const size = parseInt(req.query.size, 10) || 20;

			const events = await eventService.getAll({ page, size });
			res.status(200).json(events);
		} catch (error) {
			next(error);
		}
	},

	getById: async (req, res, next) => {
		try {
			const event = await eventService.getById(req.params.id);
			res.status(200).json(event);
		} catch (error) {
			next(error);
		}
	},

	update: async (req, res, next) => {
		try {
			const event = await eventService.update(req.params.id, req.body);
			res.status(200).json(event);
		} catch (error) {
			next(error);
		}
	},

	delete: async (req, res, next) => {
		try {
			const response = await eventService.delete(req.params.id);
			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	},

	registerAttendance: async (req, res, next) => {
		try {
			const eventId = req.params.id;
			const userId = req.params.userId;

			await eventService.registerAttendance(eventId, userId);
			res.status(200).json({ message: 'Attendance registered successfully' });
		} catch (error) {
			next(error);
		}
	},

	cancelAttendance: async (req, res, next) => {
		try {
			const eventId = req.params.id;
			const userId = req.params.userId;

			await eventService.cancelAttendance(eventId, userId);
			res.status(200).json({ message: 'Attendance canceled successfully' });
		} catch (error) {
			next(error);
		}
	},
};

export default eventController;
