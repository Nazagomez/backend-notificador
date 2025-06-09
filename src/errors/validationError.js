import CustomError from "./customError.js";

/**
 * Represents a validation error.
 * @class
 * @extends CustomError
 */
class ValidationError extends CustomError {
    /**
     * Creates a new instance of ValidationError.
     * @constructor
     * @param {string} message - The error message.
     * @param {Array} fields - The fields that failed validation.
     */
    constructor(message, field) {
        super("ValidationError", message, 400);
        this.field = field;
    }
}

export default ValidationError;
