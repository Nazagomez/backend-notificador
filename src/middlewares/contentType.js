/**
 * Middleware to ensure that requests with methods POST, PUT, or PATCH
 * have the Content-Type header set to application/json.
 * If not, it responds with a 415 Unsupported Media Type status.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */

const requireJson = (req, res, next) => {
	const methodsToCheck = ['POST', 'PUT', 'PATCH'];
	const contentType = req.headers['content-type'] || '';

	if (methodsToCheck.includes(req.method) && !contentType.includes('application/json')) {
		return res.status(415).json({
			error: 'Unsupported Media Type',
			message: 'Requests must have Content-Type: application/json',
		});
	}

	next();
};

export default requireJson;
