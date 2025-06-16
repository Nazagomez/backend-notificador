import CustomError from "./customError.js";

/**
 * Represents a custom error for when a resource is not found.
 * @extends CustomError
 */
class NotFoundError extends CustomError {
    /**
     * Creates a new NotFoundError instance.
     * @param {string} resource - The name of the resource that was not found.
     * @param {string} resourceId - The ID of the resource that was not found.
     */
    constructor(resource, resourceId) {
        const message = `The ${resource} with the id ${resourceId} was not found`;
        super("NotFoundError", message, 404);
        this.resource = resource;
        this.resourceId = resourceId;
    }
}

export default NotFoundError;
