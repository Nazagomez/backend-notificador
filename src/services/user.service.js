import NotFoundError from '../errors/notFoundError.js';
import { User } from '../models/index.js';

const userService = {
	create: async (userData) => {
		try {
			const user = await User.create(userData);
			return user;
		} catch (error) {
			throw error;
		}
	},
	getAll: async () => {
		try {
			const users = await User.findAll();
			return users;
		} catch (error) {
			throw error;
		}
	},
	getById: async (id) => {
		try {
			const user = await User.findByPk(id);
			if (!user) {
				throw new NotFoundError('User', id);
			}
			return user;
		} catch (error) {
			throw error;
		}
	},
	update: async (id, userData) => {
		try {
			const user = await User.findByPk(id);
			if (!user) {
				throw new NotFoundError('User', id);
			}
			await user.update(userData);
			return user;
		} catch (error) {
			throw error;
		}
	},
	delete: async (id) => {
		try {
			const user = await User.findByPk(id);
			if (!user) {
				throw new NotFoundError('User', id);
			}
			await user.destroy();
			return { message: 'User deleted successfully' };
		} catch (error) {
			throw error;
		}
	},
};

export default userService;
