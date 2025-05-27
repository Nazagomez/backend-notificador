/**
 * @swagger
 * tags:
 *   name: Notificaciones
 *   description: Operaciones relacionadas con notificaciones de usuarios
 */

const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * @swagger
 * /notificaciones:
 *   get:
 *     summary: Obtener todas las notificaciones
 *     tags: [Notificaciones]
 *     responses:
 *       200:
 *         description: Lista de notificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificacion'
 */
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Notificacion');
  res.json(rows);
});

/**
 * @swagger
 * /notificaciones:
 *   post:
 *     summary: Crear una nueva notificación
 *     tags: [Notificaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificacionInput'
 *     responses:
 *       201:
 *         description: Notificación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 */
router.post('/', async (req, res) => {
  const { Mensaje, Fecha, Hora, ID_Usuario } = req.body;
  const [result] = await db.query(
    'INSERT INTO Notificacion (Mensaje, Fecha, Hora, ID_Usuario) VALUES (?, ?, ?, ?)',
    [Mensaje, Fecha, Hora, ID_Usuario]
  );
  res.status(201).json({ id: result.insertId });
});

/**
 * @swagger
 * /notificaciones/{id}:
 *   get:
 *     summary: Obtener una notificación por ID
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Detalles de la notificación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notificacion'
 */
router.get('/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Notificacion WHERE ID_Notificacion = ?', [req.params.id]);
  res.json(rows[0]);
});

/**
 * @swagger
 * /notificaciones/{id}:
 *   put:
 *     summary: Actualizar una notificación existente
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la notificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificacionInput'
 *     responses:
 *       200:
 *         description: Notificación actualizada correctamente
 */
router.put('/:id', async (req, res) => {
  const { Mensaje, Fecha, Hora, ID_Usuario } = req.body;
  await db.query(
    'UPDATE Notificacion SET Mensaje = ?, Fecha = ?, Hora = ?, ID_Usuario = ? WHERE ID_Notificacion = ?',
    [Mensaje, Fecha, Hora, ID_Usuario, req.params.id]
  );
  res.json({ message: 'Notificación actualizada' });
});

/**
 * @swagger
 * /notificaciones/{id}:
 *   delete:
 *     summary: Eliminar una notificación
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Notificación eliminada correctamente
 */
router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM Notificacion WHERE ID_Notificacion = ?', [req.params.id]);
  res.json({ message: 'Notificación eliminada' });
});

module.exports = router;