const express = require('express')
const ProductSchema = require('../models/products')

const router = express.Router()


// Get All Products 
router.get("/all", async (req, res) => {
    try {
        const allProducts = await ProductSchema.find()
        res.status(200).json(allProducts)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const ProductDetail = await ProductSchema.findById(req.params.id)
        res.status(200).json(ProductDetail)
    } 
    catch (error) {
        res.status(500).json({ message: error.message })    
    }
})

// DELETE Product by ID
router.delete("delete/:id", (req, res) => {
    try {
        const DeletedProduct = ProductSchema.findByIdAndDelete(req.params.id)
        const deleteResponse ={
            message: "Product deleted successfully",
            Product: DeletedProduct
        }
        res.status(200).json(deleteResponse)
    } 
    catch (error) {
        res.status(500).json({ message: error.message })    
    }
})

module.exports = router