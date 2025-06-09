import authService from '../services/auth.service.js';

const authController = {
	login: async (req, res, next) => {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res.status(400).json({ message: 'Email and password are required.' });
			}
			const user = await authService.login(email, password);
			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	},
};

export default authController;
