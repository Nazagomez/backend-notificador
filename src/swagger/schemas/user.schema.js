/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           format: email
 *           nullable: false
 *           example: "usuario@example.com"
 *         password:
 *           type: string
 *           nullable: false
 *           example: "password123"
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           example: "user"
 */
