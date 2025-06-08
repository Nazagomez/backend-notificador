import userService from '../services/user.service.js';

const userController = {
  create: async (req, res) => {
	try {
	  const user = await userService.create(req.body);
	  res.status(201).json(user);
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
  },

  getAll: async (req, res) => {
	try {
	  const users = await userService.getAll();
	  res.status(200).json(users);
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
  },

  getById: async (req, res) => {
	try {
	  const user = await userService.getById(req.params.id);
	  res.status(200).json(user);
	} catch (error) {
	  res.status(404).json({ message: error.message });
	}
  },

  update: async (req, res) => {
	try {
	  const user = await userService.update(req.params.id, req.body);
	  res.status(200).json(user);
	} catch (error) {
	  res.status(404).json({ message: error.message });
	}
  },

  delete: async (req, res) => {
	try {
	  const response = await userService.delete(req.params.id);
	  res.status(200).json(response);
	} catch (error) {
	  res.status(404).json({ message: error.message });
	}
  },
};

export default userController;