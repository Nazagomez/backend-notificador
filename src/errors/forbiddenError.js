import CustomError from './customError.js';

/**
 * Represents a Forbidden Error.
 * @class
 * @extends CustomError
 */
class ForbiddenError extends CustomError {
	/**
	 * Creates a new instance of the ForbiddenError class.
	 * @constructor
	 * @param {string} action - The action that was forbidden.
	 * @param {string} reason - The reason for the forbidden action.
	 * @param {string} token - The token associated with the forbidden action.
	 */
	constructor(forbidAction, message) {
		super('ForbiddenError', message, 403);
		this.forbidAction = forbidAction;
	}
}

export default ForbiddenError;
