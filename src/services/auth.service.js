import NotFoundError from '../errors/notFoundError.js';
import UnauthorizedError from '../errors/unauthorizedError.js';
import { User } from '../models/index.js';

const authService = {
	login: async (email, password) => {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			throw new NotFoundError('User', email);
		}
		if (user.password !== password) {
			throw new UnauthorizedError('login', 'Invalid email or password');
		}

		delete user.dataValues.password;
		return user;
	},
};

export default authService;
