const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Eventos',
      version: '1.0.0',
      description: 'Documentación de la API para gestionar usuarios, eventos, inscripciones, notificaciones e inicio de sesión.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor local',
      },
    ],
    components: {
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            ID_Usuario: {
              type: 'integer',
              example: 1
            },
            Nombre: {
              type: 'string',
              example: 'Juan Pérez'
            },
            Correo: {
              type: 'string',
              example: 'juan@example.com'
            }
          }
        },
        UsuarioInput: {
          type: 'object',
          properties: {
            Nombre: {
              type: 'string',
              example: 'Juan Pérez'
            },
            Correo: {
              type: 'string',
              example: 'juan@example.com'
            }
          },
          required: ['Nombre', 'Correo']
        },
        Evento: {
          type: 'object',
          properties: {
            ID_Evento: { type: 'integer', example: 1 },
            ID_Usuario: { type: 'integer', example: 2 },
            Titulo: { type: 'string', example: 'Concierto de Rock' },
            Descripcion: { type: 'string', example: 'Concierto en vivo con bandas locales.' },
            Fecha: { type: 'string', example: '2025-06-15' },
            Hora: { type: 'string', example: '20:00:00' },
            Ubicacion: { type: 'string', example: 'Estadio Nacional' },
            Categoria: { type: 'string', example: 'Música' },
            Estado: { type: 'string', example: 'Activo' }
          }
        },
        EventoInput: {
          type: 'object',
          required: ['ID_Usuario', 'Titulo', 'Descripcion', 'Fecha', 'Hora', 'Ubicacion', 'Categoria', 'Estado'],
          properties: {
            ID_Usuario: { type: 'integer', example: 2 },
            Titulo: { type: 'string', example: 'Concierto de Rock' },
            Descripcion: { type: 'string', example: 'Concierto en vivo con bandas locales.' },
            Fecha: { type: 'string', example: '2025-06-15' },
            Hora: { type: 'string', example: '20:00:00' },
            Ubicacion: { type: 'string', example: 'Estadio Nacional' },
            Categoria: { type: 'string', example: 'Música' },
            Estado: { type: 'string', example: 'Activo' }
          }
        },
        Inscripcion: {
          type: 'object',
          properties: {
            ID_Inscripcion: { type: 'integer', example: 1 },
            ID_Usuario: { type: 'integer', example: 3 },
            ID_Evento: { type: 'integer', example: 2 },
            Fecha: { type: 'string', example: '2025-07-01' },
            Inscripcion: { type: 'string', example: 'Inscripción general' },
            Hora: { type: 'string', example: '10:30:00' }
          }
        },
        InscripcionInput: {
          type: 'object',
          required: ['ID_Usuario', 'ID_Evento', 'Fecha', 'Inscripcion', 'Hora'],
          properties: {
            ID_Usuario: { type: 'integer', example: 3 },
            ID_Evento: { type: 'integer', example: 2 },
            Fecha: { type: 'string', example: '2025-07-01' },
            Inscripcion: { type: 'string', example: 'Inscripción general' },
            Hora: { type: 'string', example: '10:30:00' }
          }
        },
        Notificacion: {
          type: 'object',
          properties: {
            ID_Notificacion: { type: 'integer', example: 1 },
            Mensaje: { type: 'string', example: 'Recordatorio de evento' },
            Fecha: { type: 'string', example: '2025-07-01' },
            Hora: { type: 'string', example: '14:00:00' },
            ID_Usuario: { type: 'integer', example: 2 }
          }
        },
        NotificacionInput: {
          type: 'object',
          required: ['Mensaje', 'Fecha', 'Hora', 'ID_Usuario'],
          properties: {
            Mensaje: { type: 'string', example: 'Recordatorio de evento' },
            Fecha: { type: 'string', example: '2025-07-01' },
            Hora: { type: 'string', example: '14:00:00' },
            ID_Usuario: { type: 'integer', example: 2 }
          }
        },
        InicioSesion: {
          type: 'object',
          properties: {
            Correo: { type: 'string', example: 'usuario@example.com' },
            Contrasena: { type: 'string', example: '1234abcd' }
          }
        },
        InicioSesionInput: {
          type: 'object',
          required: ['Correo', 'Contrasena'],
          properties: {
            Correo: { type: 'string', example: 'usuario@example.com' },
            Contrasena: { type: 'string', example: '1234abcd' }
          }
        }
      }
    }
  },
  apis: [
    './routes/*.js',
    './swagger.js'
  ],
};

const swaggerSpec = swaggerJSDoc(options);

if (!swaggerSpec.components || !swaggerSpec.components.schemas) {
  console.error('Error: No se encontraron los esquemas en la especificación Swagger');
} else {
  console.log('Esquemas cargados correctamente:', Object.keys(swaggerSpec.components.schemas));
}

module.exports = swaggerSpec;