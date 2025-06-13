/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the event
 *         title:
 *           type: string
 *           description: The title of the event
 *         description:
 *           type: string
 *           description: A detailed description of the event
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the event will occur
 *         location:
 *           type: string
 *           description: The location of the event
 *         organizer:
 *           type: string
 *           description: The person or entity organizing the event
 *         category:
 *           type: string
 *           enum: [sport, music, art, technology, education, politics, health, games, culture, other]
 *           description: The category of the event
 *         state:
 *           type: string
 *           enum: [upcoming, ongoing, completed, cancelled, postponed]
 *           description: The current state of the event
 *         featured:
 *           type: boolean
 *           description: Indicates if the event is featured
 *           default: false
 *         UserId:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who created the event
 *       required:
 *         - title
 *         - description
 *         - date
 *         - location
 *         - organizer
 *         - category
 *         - state
 *         - UserId
 *       example:
 *         id: "f1e3a8f4-3497-42f9-9c70-123456789abc"
 *         title: "Tech Conference 2025"
 *         description: "A conference about the latest advancements in technology."
 *         date: "2025-09-15T10:00:00Z"
 *         location: "Auditorium Tempisque"
 *         organizer: "OpenTech"
 *         category: "technology"
 *         state: "upcoming"
 *         featured: false
 *         UserId: "123e4567-e89b-12d3-a456-426614174000"
 */
