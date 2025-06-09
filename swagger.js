// swagger.js actualizado con JWT y seguridad global
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
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            ID_Usuario: { type: 'integer', example: 1 },
            Nombre: { type: 'string', example: 'Juan Pérez' },
            Correo: { type: 'string', example: 'juan@example.com' }
          }
        },
        UsuarioInput: {
          type: 'object',
          required: ['Nombre', 'Correo'],
          properties: {
            Nombre: { type: 'string', example: 'Juan Pérez' },
            Correo: { type: 'string', example: 'juan@example.com' }
          }
        },
        TokenResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR...' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 1 },
                correo: { type: 'string', example: 'usuario@example.com' }
              }
            }
          }
        },
        InicioSesionInput: {
          type: 'object',
          required: ['Correo', 'Contrasena'],
          properties: {
            Correo: { type: 'string', example: 'usuario@example.com' },
            Contrasena: { type: 'string', example: '1234abcd' }
          }
        },
        InicioSesion: {
  type: 'object',
  properties: {
    Correo: {
      type: 'string',
      example: 'usuario@example.com'
    },
    Contrasena: {
      type: 'string',
      example: '1234abcd'
    }
  }
},

      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./routes/*.js', './swagger.js'],
};

const swaggerSpec = swaggerJSDoc(options);

if (!swaggerSpec.components || !swaggerSpec.components.schemas) {
  console.error('Error: No se encontraron los esquemas en la especificación Swagger');
} else {
  console.log('Esquemas cargados correctamente:', Object.keys(swaggerSpec.components.schemas));
}

module.exports = swaggerSpec;