/**
 * @swagger
 * tags:
 *   name: InicioSesion
 *   description: Gestión de inicio de sesión de usuarios
 */

const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * @swagger
 * /inicio-sesion:
 *   get:
 *     summary: Obtener todos los registros de inicio de sesión
 *     tags: [InicioSesion]
 *     responses:
 *       200:
 *         description: Lista de inicios de sesión
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InicioSesion'
 */
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Inicio_Sesion');
  res.json(rows);
});

/**
 * @swagger
 * /inicio-sesion:
 *   post:
 *     summary: Crear un nuevo registro de inicio de sesión
 *     tags: [InicioSesion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InicioSesionInput'
 *     responses:
 *       201:
 *         description: Inicio de sesión registrado
 */
router.post('/', async (req, res) => {
  const { Correo, Contrasena } = req.body;
  await db.query(
    'INSERT INTO Inicio_Sesion (Correo, Contrasena) VALUES (?, ?)',
    [Correo, Contrasena]
  );
  res.status(201).json({ message: 'Inicio de sesión registrado' });
});

/**
 * @swagger
 * /inicio-sesion/{correo}:
 *   get:
 *     summary: Obtener un registro de inicio de sesión por correo
 *     tags: [InicioSesion]
 *     parameters:
 *       - in: path
 *         name: correo
 *         required: true
 *         schema:
 *           type: string
 *         description: Correo electrónico del usuario
 *     responses:
 *       200:
 *         description: Registro de inicio de sesión
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InicioSesion'
 */
router.get('/:correo', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Inicio_Sesion WHERE Correo = ?', [req.params.correo]);
  res.json(rows[0]);
});

/**
 * @swagger
 * /inicio-sesion/{correo}:
 *   put:
 *     summary: Actualizar contraseña de inicio de sesión
 *     tags: [InicioSesion]
 *     parameters:
 *       - in: path
 *         name: correo
 *         required: true
 *         schema:
 *           type: string
 *         description: Correo electrónico del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               Contrasena:
 *                 type: string
 *                 example: nueva_contrasena123
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 */
router.put('/:correo', async (req, res) => {
  const { Contrasena } = req.body;
  await db.query('UPDATE Inicio_Sesion SET Contrasena = ? WHERE Correo = ?', [Contrasena, req.params.correo]);
  res.json({ message: 'Contraseña actualizada' });
});

/**
 * @swagger
 * /inicio-sesion/{correo}:
 *   delete:
 *     summary: Eliminar registro de inicio de sesión por correo
 *     tags: [InicioSesion]
 *     parameters:
 *       - in: path
 *         name: correo
 *         required: true
 *         schema:
 *           type: string
 *         description: Correo electrónico del usuario
 *     responses:
 *       200:
 *         description: Registro eliminado correctamente
 */
router.delete('/:correo', async (req, res) => {
  await db.query('DELETE FROM Inicio_Sesion WHERE Correo = ?', [req.params.correo]);
  res.json({ message: 'Registro eliminado' });
});

module.exports = router;