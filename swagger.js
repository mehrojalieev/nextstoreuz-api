// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger konfiguratsiyasi
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API hujjatlari va test',
      contact: {
        name: 'Developer',
      },
      servers: [
        {
          url: 'https://parfume-deploy-1.onrender.com', // Onlayn server URL
        },
      ],
    },
  },
  apis: ['./routes/*.js'], // API yo'llarini ko'rsating
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
