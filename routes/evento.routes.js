const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

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
/**
 * @swagger
 * components:
 *   schemas:
 *     EventoInput:
 *       type: object
 *       required:
 *         - ID_Usuario
 *         - Titulo
 *         - Descripcion
 *         - Fecha
 *         - Hora
 *         - Ubicacion
 *         - Categoria
 *         - Estado
 *         - Imagen
 *       properties:
 *         ID_Usuario:
 *           type: integer
 *         Titulo:
 *           type: string
 *         Descripcion:
 *           type: string
 *         Fecha:
 *           type: string
 *           format: date
 *         Hora:
 *           type: string
 *           format: time
 *         Ubicacion:
 *           type: string
 *         Categoria:
 *           type: string
 *         Estado:
 *           type: string
 *         Imagen:
 *           type: string
 *           format: uri
 *           example: "https://i.imgur.com/YPXbQfG.png"
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
  const { ID_Usuario, Titulo, Descripcion, Fecha, Hora, Ubicacion, Categoria, Estado, Imagen } = req.body;
  const [result] = await db.query(
    'INSERT INTO Evento (ID_Usuario, Titulo, Descripcion, Fecha, Hora, Ubicacion, Categoria, Estado, Imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [ID_Usuario, Titulo, Descripcion, Fecha, Hora, Ubicacion, Categoria, Estado, Imagen]
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
  const { ID_Usuario, Titulo, Descripcion, Fecha, Hora, Ubicacion, Categoria, Estado, Imagen } = req.body;
  await db.query(
    'UPDATE Evento SET ID_Usuario = ?, Titulo = ?, Descripcion = ?, Fecha = ?, Hora = ?, Ubicacion = ?, Categoria = ?, Estado = ?, Imagen = ? WHERE ID_Evento = ?',
    [ID_Usuario, Titulo, Descripcion, Fecha, Hora, Ubicacion, Categoria, Estado, Imagen, req.params.id]
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

/**
 * @swagger
 * /eventos/upload-image:
 *   post:
 *     summary: Subir una imagen para un evento
 *     tags: [Eventos]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagen:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen a subir
 *     responses:
 *       200:
 *         description: URL de la imagen subida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: "http://localhost:3000/uploads/imagen.jpg"
 */

// Subir imagen
router.post('/upload-image', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se envió ninguna imagen.' });
  }

  const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.status(200).json({ url: imageUrl });
});


module.exports = router;
