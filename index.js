const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())
require('dotenv').config()

mongoose.connect(process.env.MONGODB_CONNECT_URL)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('Connected to MongoDB'))

app.use("/product", require('./routes/products'))


app.listen(process.env.PORT, () => console.log('Server started on port ' + process.env.PORT))