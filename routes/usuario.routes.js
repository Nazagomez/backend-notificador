const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones relacionadas con los usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Usuario');
  res.json(rows);
});

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
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
  const { Nombre, Correo } = req.body;
  const [result] = await db.query(
    'INSERT INTO Usuario (Nombre, Correo) VALUES (?, ?)',
    [Nombre, Correo]
  );
  res.status(201).json({ id: result.insertId });
});

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Detalles del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 */
router.get('/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Usuario WHERE ID_Usuario = ?', [req.params.id]);
  res.json(rows[0]);
});

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 */
router.put('/:id', async (req, res) => {
  const { Nombre, Correo } = req.body;
  await db.query(
    'UPDATE Usuario SET Nombre = ?, Correo = ? WHERE ID_Usuario = ?',
    [Nombre, Correo, req.params.id]
  );
  res.json({ message: 'Usuario actualizado' });
});

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 */
router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM Usuario WHERE ID_Usuario = ?', [req.params.id]);
  res.json({ message: 'Usuario eliminado' });
});

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InicioSesionInput'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       401:
 *         description: Credenciales incorrectas
 */

module.exports = router;