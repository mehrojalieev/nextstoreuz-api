const express = require('express');
const ProductSchema = require('../models/products');

const router = express.Router();

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
