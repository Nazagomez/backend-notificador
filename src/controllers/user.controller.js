import userService from '../services/user.service.js';

const userController = {
  create: async (req, res, next) => {
	try {
	  const user = await userService.create(req.body);
	  res.status(201).json(user);
	} catch (error) {
		next(error);
	}
  },

  getAll: async (req, res, next) => {
	try {
	  const users = await userService.getAll();
	  res.status(200).json(users);
	} catch (error) {
		next(error);
	}
  },

  getById: async (req, res, next) => {
	try {
	  const user = await userService.getById(req.params.id);
	  res.status(200).json(user);
	} catch (error) {
		next(error);
	}
  },

  update: async (req, res, next) => {
	try {
	  const user = await userService.update(req.params.id, req.body);
	  res.status(200).json(user);
	} catch (error) {
		next(error);
	}
  },

  delete: async (req, res, next) => {
	try {
	  const response = await userService.delete(req.params.id);
	  res.status(200).json(response);
	} catch (error) {
		next(error);
	}
  },
};

export default userController;