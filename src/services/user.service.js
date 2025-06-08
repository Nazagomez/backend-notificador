import { User } from '../models/index.js';

const userService = {
	create: async (userData) => {
		try {
			const user = await User.create(userData);
			return user;
		} catch (error) {
			throw new Error('Error creating user: ' + error.message);
		}
	},
	getAll: async () => {
		try {
			const users = await User.findAll();
			return users;
		} catch (error) {
			throw new Error('Error fetching users: ' + error.message);
		}
	},
	getById: async (id) => {
		try {
			const user = await User.findByPk(id);
			if (!user) {
				throw new Error('User not found');
			}
			return user;
		} catch (error) {
			throw new Error('Error fetching user: ' + error.message);
		}
	},
	update: async (id, userData) => {
		try {
			const user = await User.findByPk(id);
			if (!user) {
				throw new Error('User not found');
			}
			await user.update(userData);
			return user;
		} catch (error) {
			throw new Error('Error updating user: ' + error.message);
		}
	},
	delete: async (id) => {
		try {
			const user = await User.findByPk(id);
			if (!user) {
				throw new Error('User not found');
			}
			await user.destroy();
			return { message: 'User deleted successfully' };
		} catch (error) {
			throw new Error('Error deleting user: ' + error.message);
		}
	},
}

export default userService;