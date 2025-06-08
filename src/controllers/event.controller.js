import eventService from '../services/event.service.js';

const eventController = {
  create: async (req, res) => {
	try {
	  const event = await eventService.create(req.body);
	  res.status(201).json(event);
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
  },

  getAll: async (req, res) => {
	try {
	  const events = await eventService.getAll();
	  res.status(200).json(events);
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
  },

  getById: async (req, res) => {
	try {
	  const event = await eventService.getById(req.params.id);
	  res.status(200).json(event);
	} catch (error) {
	  res.status(404).json({ message: error.message });
	}
  },

  update: async (req, res) => {
	try {
	  const event = await eventService.update(req.params.id, req.body);
	  res.status(200).json(event);
	} catch (error) {
	  res.status(404).json({ message: error.message });
	}
  },

  delete: async (req, res) => {
	try {
	  const response = await eventService.delete(req.params.id);
	  res.status(200).json(response);
	} catch (error) {
	  res.status(404).json({ message: error.message });
	}
  },
};

export default eventController;