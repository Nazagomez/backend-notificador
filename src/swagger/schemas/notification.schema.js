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
 *       required:
 *         - title
 *         - message
 *       example:
 *         id: "9fbd5c4e-2994-45d1-b2e6-9a647f5897d3"
 *         title: "New Update Available"
 *         message: "A new version of the app has been released. Please update to enjoy the latest features."
 */
