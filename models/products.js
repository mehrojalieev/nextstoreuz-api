const mongoose = require('mongoose')

// Category schema
const categorySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: categorySchema,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    imageUrl: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})
const ProductSchema = mongoose.model('products', productSchema)

module.exports = ProductSchema