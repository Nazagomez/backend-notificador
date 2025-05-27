/**
 * @swagger
 * tags:
 *   name: Inscripciones
 *   description: Operaciones relacionadas con inscripciones a eventos
 */

const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * @swagger
 * /inscripciones:
 *   get:
 *     summary: Obtener todas las inscripciones
 *     tags: [Inscripciones]
 *     responses:
 *       200:
 *         description: Lista de inscripciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inscripcion'
 */
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Inscripcion');
  res.json(rows);
});

/**
 * @swagger
 * /inscripciones:
 *   post:
 *     summary: Crear una nueva inscripción
 *     tags: [Inscripciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InscripcionInput'
 *     responses:
 *       201:
 *         description: Inscripción creada exitosamente
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
  const { ID_Usuario, ID_Evento, Fecha, Inscripcion, Hora } = req.body;
  const [result] = await db.query(
    'INSERT INTO Inscripcion (ID_Usuario, ID_Evento, Fecha, Inscripcion, Hora) VALUES (?, ?, ?, ?, ?)',
    [ID_Usuario, ID_Evento, Fecha, Inscripcion, Hora]
  );
  res.status(201).json({ id: result.insertId });
});

/**
 * @swagger
 * /inscripciones/{id}:
 *   get:
 *     summary: Obtener una inscripción por ID
 *     tags: [Inscripciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la inscripción
 *     responses:
 *       200:
 *         description: Detalles de la inscripción
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inscripcion'
 */
router.get('/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Inscripcion WHERE ID_Inscripcion = ?', [req.params.id]);
  res.json(rows[0]);
});

/**
 * @swagger
 * /inscripciones/{id}:
 *   put:
 *     summary: Actualizar una inscripción existente
 *     tags: [Inscripciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la inscripción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InscripcionInput'
 *     responses:
 *       200:
 *         description: Inscripción actualizada correctamente
 */
router.put('/:id', async (req, res) => {
  const { ID_Usuario, ID_Evento, Fecha, Inscripcion, Hora } = req.body;
  await db.query(
    'UPDATE Inscripcion SET ID_Usuario = ?, ID_Evento = ?, Fecha = ?, Inscripcion = ?, Hora = ? WHERE ID_Inscripcion = ?',
    [ID_Usuario, ID_Evento, Fecha, Inscripcion, Hora, req.params.id]
  );
  res.json({ message: 'Inscripción actualizada' });
});

/**
 * @swagger
 * /inscripciones/{id}:
 *   delete:
 *     summary: Eliminar una inscripción
 *     tags: [Inscripciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la inscripción
 *     responses:
 *       200:
 *         description: Inscripción eliminada correctamente
 */
router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM Inscripcion WHERE ID_Inscripcion = ?', [req.params.id]);
  res.json({ message: 'Inscripción eliminada' });
});

module.exports = router;