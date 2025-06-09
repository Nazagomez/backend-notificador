const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(bodyParser.json());

const usuarioRoutes = require('./routes/usuario.routes');
const eventoRoutes = require('./routes/evento.routes');
const inscripcionRoutes = require('./routes/inscripcion.routes');
const notificacionRoutes = require('./routes/notificacion.routes');
const inicioSesionRoutes = require('./routes/inicio_sesion.routes');
const authRoutes = require('./routes/auth.routes');
const verifyToken = require('./middleware/auth.middleware');

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', verifyToken, usuarioRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/inscripciones', inscripcionRoutes);
app.use('/api/notificaciones', notificacionRoutes);
app.use('/api/inicio-sesion', inicioSesionRoutes);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(`Documentación Swagger en http://localhost:${port}/api-docs`);
});