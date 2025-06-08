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
 *         email:
 *           type: string
 *           format: email
 *           nullable: true
 *           example: "usuario@example.com"
 *         password:
 *           type: string
 *           nullable: true
 *           example: "password123"
 *         role:
 *           type: string
 *           enum: [admin, anonymous]
 *           example: "anonymous"
 */