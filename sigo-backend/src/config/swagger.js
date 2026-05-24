const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi   = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SIGAI API – Alcaldía Municipal',
      version: '1.0.0',
      description: 'API REST para gestión de inventario de bienes públicos',
    },
    servers: [{ url: 'http://localhost:4000/api' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      },
      schemas: {
        Bien: {
          type: 'object',
          properties: {
            id:           { type: 'integer' },
            codigo:       { type: 'string', example: 'ALQ-2024-0042' },
            descripcion:  { type: 'string', example: 'Computador portátil Dell' },
            dependencia:  { type: 'string', example: 'Secretaría de Hacienda' },
            estado:       { type: 'string',
                            enum: ['ACTIVO', 'BAJA', 'MANTENIMIENTO'] },
            fechaIngreso: { type: 'string', format: 'date' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};