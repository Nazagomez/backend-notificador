/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the notification
 *         title:
 *           type: string
 *           description: The title of the notification
 *         message:
 *           type: string
 *           description: The message body of the notification
 *         UserId:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who created the notification
 *         EventId:
 *           type: string
 *           format: uuid
 *           description: The ID of the event associated with the notification
 *       required:
 *         - title
 *         - message
 *         - UserId
 *         - EventId
 *       example:
 *         id: "9fbd5c4e-2994-45d1-b2e6-9a647f5897d3"
 *         title: "New Update Available"
 *         message: "A new version of the app has been released. Please update to enjoy the latest features."
 *         UserId: "123e4567-e89b-12d3-a456-426614174000"
 *         EventId: "f1e3a8f4-3497-42f9-9c70-123456789abc"
 */
