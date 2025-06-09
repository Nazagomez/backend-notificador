import CustomError from './customError.js';

/**
 * Represents an Unauthorized Error.
 * @class
 * @extends CustomError
 */
class UnauthorizedError extends CustomError {
	/**
	 * Creates an instance of UnauthorizedError.
	 * @constructor
	 * @param {string} resource - The resource that requires authentication.
	 * @param {string} reason - Optional explanation, like 'Missing token' or 'Invalid token'.
	 */
	constructor(resource, reason = 'Missing or invalid authentication token') {
		const message = `Unauthorized access to '${resource}'. ${reason}.`;
		super('UnauthorizedError', message, 401);
		this.resource = resource;
		this.reason = reason;
	}
}

export default UnauthorizedError;
