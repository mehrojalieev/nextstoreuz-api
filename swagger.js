const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'Product API documentation',
      contact: {
        name: 'Developer',
      },
      servers: [
        {
          url: "https://nextstoreuz-api.onrender.com",
        },
      ],
    },
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The product ID'
            },
            title: {
              type: 'string',
              description: 'The product title'
            },
            price: {
              type: 'number',
              description: 'The product price'
            },
            description: {
              type: 'string',
              description: 'The product description'
            },
            category: {
              type: 'string',
              description: 'The product category'
            },
            imageUrl: {
              type: 'string',
              description: 'The product image URL'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the product was created'
            }
          }
        },
        ProductInput: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'The product title',
              example: 'New Product'
            },
            price: {
              type: 'number',
              description: 'The product price',
              example: 19.99
            },
            description: {
              type: 'string',
              description: 'The product description',
              example: 'This is a new product.'
            },
            category: {
              type: 'string',
              description: 'The product category',
              example: 'Electronics'
            },
            imageUrl: {
              type: 'string',
              description: 'The product image URL',
              example: 'http://example.com/image.png'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/products.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
