/**
 * Represents a custom error with a specific name, message, and status code.
 * @class CustomError
 * @extends Error
 */
class CustomError extends Error {
    /**
     * Creates a new instance of the CustomError class.
     * @constructor
     * @param {string} name - The name of the error.
     * @param {string} message - The error message.
     * @param {number} statusCode - The status code of the error.
     */
	constructor(name, message, statusCode) {
		super(message);
        this.name = name;
		this.statusCode = statusCode;

		Object.setPrototypeOf(this, CustomError.prototype);
	}
}

export default CustomError;
