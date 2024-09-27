const express = require('express');
require('dotenv').config();
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());

const mongoose = require('mongoose');
const { swaggerDocs, swaggerUi } = require('./swagger');

const PORT = process.env.PORT || 8080;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error !!!:'));
db.once('open', () => console.log('Connected to MongoDB !'));

// Swagger UI route
app.use('/swagger/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routers
app.use("/api/product", require('./routes/products'));
app.use("/api", require("./routes/users"));

// Start server
app.listen(PORT, () => console.log('Server started on port ' + PORT));
