const express = require('express');
const ProductSchema = require('../models/products');
const Joi = require('joi');

const router = express.Router();

// Define Joi validation schema

const productValidationSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    imageUrl: Joi.string().required()
})

// Get All Products
/**
 * @swagger
 * /product/all:
 *   get:   
 *     summary: Barcha mahsulotlarni olish
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Mahsulotlar muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 */
router.get('/all', async (req, res) => {
    try {
        const allProducts = await ProductSchema.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Get product by ID
/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Mahsulotni ID orqali olish
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Mahsulotning IDsi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mahsulot muvaffaqiyatli qaytarildi
 *       404:
 *         description: Mahsulot topilmadi
 *       500:
 *         description: Xatolik yuz berdi
 */
router.get('/:id', async (req, res) => {
    try {
        const productDetail = await ProductSchema.findById(req.params.id);
        if (!productDetail) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(productDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// POST Product


/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The product title
 *                 example: "New Product"
 *               price:
 *                 type: number
 *                 description: The product price
 *                 example: 19.99
 *               description:
 *                 type: string
 *                 description: The product description
 *                 example: "This is a new product."
 *               category:
 *                 type: string
 *                 description: The product category
 *                 example: "Electronics"
 *               imageUrl:
 *                 type: string
 *                 description: The URL of the product image
 *                 example: "http://example.com/image.png"
 *     responses:
 *       200:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The product ID
 *                 title:
 *                   type: string
 *                   description: The product title
 *                 price:
 *                   type: number
 *                   description: The product price
 *                 description:
 *                   type: string
 *                   description: The product description
 *                 category:
 *                   type: string
 *                   description: The product category
 *                 imageUrl:
 *                   type: string
 *                   description: The product image URL
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the product was created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */


router.post('/create', async (req, res) => {

    const { error, value } = productValidationSchema.validate(req.body, { stripUnknown: true });

    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    try {
        const newProduct = new ProductSchema(value)
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// DELETE Product by ID
/**
 * @swagger
 * /product/delete/{id}:
 *   delete:
 *     summary: Mahsulotni ID orqali o'chirish
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chirilishi kerak bo'lgan mahsulotning IDsi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mahsulot muvaffaqiyatli o'chirildi
 *       404:
 *         description: Mahsulot topilmadi
 *       500:
 *         description: Xatolik yuz berdi
 */
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedProduct = await ProductSchema.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const deleteResponse = {
            message: 'Product deleted successfully',
            Product: deletedProduct
        };
        res.status(200).json(deleteResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
