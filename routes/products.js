const express = require('express')
const ProductSchema = require('../models/products')

const router = express.Router()

router.get("/all", async (req, res) => {
    try {
        const allProducts = await ProductSchema.find()
        res.status(200).json(allProducts)
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
})


module.exports = router