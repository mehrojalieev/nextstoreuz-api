// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger konfiguratsiyasi
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'Product API hujjatlari',
      contact: {
        name: 'Developer',
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 8080}`, // Lokal server
        },
      ],
    },
  },
  apis: ['./routes/products.js'], // API yo'llarini ko'rsating
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };