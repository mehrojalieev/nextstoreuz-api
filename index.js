const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const mongoose = require('mongoose');
const { swaggerDocs, swaggerUi } = require('./swagger');

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error !!!:'));
db.once('open', () => console.log('Connected to MongoDB !'));

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routers
app.use("/product", require('./routes/products'));

app.listen(PORT, () => console.log('Server started on port ' + PORT));
