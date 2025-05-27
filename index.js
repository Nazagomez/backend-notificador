const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const usuarioRoutes = require('./routes/usuario.routes');
const eventoRoutes = require('./routes/evento.routes');
const inscripcionRoutes = require('./routes/inscripcion.routes');
const notificacionRoutes = require('./routes/notificacion.routes');
const inicioSesionRoutes = require('./routes/inicio_sesion.routes');

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/inscripciones', inscripcionRoutes);
app.use('/api/notificaciones', notificacionRoutes);
app.use('/api/inicio-sesion', inicioSesionRoutes);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
    console.log(`Documentación Swagger en http://localhost:${port}/api-docs`);
});