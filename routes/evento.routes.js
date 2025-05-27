/**
 * @swagger
 * tags:
 *   name: Eventos
 *   description: Operaciones relacionadas con los eventos
 */

const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Obtener todos los eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 */
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Evento');
  res.json(rows);
});

/**
 * @swagger
 * /eventos:
 *   post:
 *     summary: Crear un nuevo evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventoInput'
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
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
  const { ID_Usuario, Titulo, Descripcion, Fecha, Hora, Ubicacion, Categoria, Estado } = req.body;
  const [result] = await db.query(
    'INSERT INTO Evento (ID_Usuario, Titulo, Descripcion, Fecha, Hora, Ubicacion, Categoria, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [ID_Usuario, Titulo, Descripcion, Fecha, Hora, Ubicacion, Categoria, Estado]
  );
  res.status(201).json({ id: result.insertId });
});

/**
 * @swagger
 * /eventos/{id}:
 *   get:
 *     summary: Obtener un evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Detalles del evento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 */
router.get('/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Evento WHERE ID_Evento = ?', [req.params.id]);
  res.json(rows[0]);
});

/**
 * @swagger
 * /eventos/{id}:
 *   put:
 *     summary: Actualizar un evento existente
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventoInput'
 *     responses:
 *       200:
 *         description: Evento actualizado correctamente
 */
router.put('/:id', async (req, res) => {
  const { ID_Usuario, Titulo, Descripcion, Fecha, Hora, Ubicacion, Categoria, Estado } = req.body;
  await db.query(
    'UPDATE Evento SET ID_Usuario = ?, Titulo = ?, Descripcion = ?, Fecha = ?, Hora = ?, Ubicacion = ?, Categoria = ?, Estado = ? WHERE ID_Evento = ?',
    [ID_Usuario, Titulo, Descripcion, Fecha, Hora, Ubicacion, Categoria, Estado, req.params.id]
  );
  res.json({ message: 'Evento actualizado' });
});

/**
 * @swagger
 * /eventos/{id}:
 *   delete:
 *     summary: Eliminar un evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento a eliminar
 *     responses:
 *       200:
 *         description: Evento eliminado correctamente
 */
router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM Evento WHERE ID_Evento = ?', [req.params.id]);
  res.json({ message: 'Evento eliminado' });
});

module.exports = router;