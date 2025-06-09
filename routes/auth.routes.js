const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Correo
 *               - Contrasena
 *             properties:
 *               Correo:
 *                 type: string
 *                 example: usuario@example.com
 *               Contrasena:
 *                 type: string
 *                 example: 1234abcd
 *     responses:
 *       200:
 *         description: Login exitoso y token generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login exitoso
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     correo:
 *                       type: string
 *                       example: usuario@example.com
 *       401:
 *         description: Correo o contraseña incorrectos
 *       500:
 *         description: Error del servidor
 */

router.post('/login', async (req, res) => {
  const { Correo, Contrasena } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM Inicio_Sesion WHERE Correo = ?', [Correo]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Correo no encontrado' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(Contrasena, user.Contrasena);

    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.ID_Usuario, correo: user.Correo },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: { id: user.ID_Usuario, correo: user.Correo }
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
