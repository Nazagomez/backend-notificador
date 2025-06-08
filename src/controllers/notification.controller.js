import notificationService from '../services/notification.service.js';

const notificationController = {
  create: async (req, res) => {
	try {
	  const notification = await notificationService.create(req.body);
	  res.status(201).json(notification);
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
  },

  getAll: async (req, res) => {
	try {
	  const notifications = await notificationService.getAll();
	  res.status(200).json(notifications);
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
  },

  getById: async (req, res) => {
	try {
	  const notification = await notificationService.getById(req.params.id);
	  res.status(200).json(notification);
	} catch (error) {
	  res.status(404).json({ message: error.message });
	}
  },

  update: async (req, res) => {
	try {
	  const notification = await notificationService.update(req.params.id, req.body);
	  res.status(200).json(notification);
	} catch (error) {
	  res.status(404).json({ message: error.message });
	}
  },

  delete: async (req, res) => {
	try {
	  const response = await notificationService.delete(req.params.id);
	  res.status(200).json(response);
	} catch (error) {
	  res.status(404).json({ message: error.message });
	}
  },
};

export default notificationController;