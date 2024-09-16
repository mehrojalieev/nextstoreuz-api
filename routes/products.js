const express = require('express');
const ProductSchema = require('../models/products');
const Joi = require('joi');

const router = express.Router();


const productValidationSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().uri().required()
    }).required(),
    brand: Joi.string().required(),
    imagesUrl: Joi.array().items(Joi.string().uri()).required()
});


// Get All Products
/**
 * @swagger
 * /api/product/all:
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
 * /api/product/{id}:
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



/**
 * @swagger
 * /api/product/category/all:
 *   get:
 *     summary: Get all categories
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of all unique categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 */
router.get("/category/all", async (req, res) => {
    try {
        const allCategories = await ProductSchema.distinct('category');
        return res.status(200).json(allCategories);
    }   
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/product/category/{categoryName}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     parameters:
 *       - name: categoryName
 *         in: path
 *         required: true
 *         description: The name of the category to fetch products for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products for the given category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get("/category/:categoryName", async (req, res) => {
    try {
        const singleCategory = await ProductSchema.find({ category: req.params.categoryName });
        if (singleCategory.length === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(singleCategory);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// POST Product


/**
 * @swagger
 * /api/product/create:
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
 *                 example: "Mahsulotni nomini kirit"
 *               price:
 *                 type: number
 *                 description: The product price
 *                 example: 19.99
 *               description:
 *                 type: string
 *                 description: Mahsulot haqida ma'lumot kirit
 *                 example: "This is a new product."
 *               category:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The category name
 *                     example: "Electronics"
 *                   image:
 *                     type: string
 *                     description: The URL of the category image
 *                     example: "https://placeimg.com/640/480/any?r=0.591926261873231"
 *               brand:
 *                 type: string
 *                 description: The product brand
 *                 example: "BrandName"
 *               imagesUrl:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The URLs of the product images
 *                 example: ["http://example.com/image1.png", "http://example.com/image2.png"]
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
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The category name
 *                     image:
 *                       type: string
 *                       description: The category image URL
 *                 brand:
 *                   type: string
 *                   description: The product brand
 *                 imageUrl:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The URLs of the product images
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the product was created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */


router.post('/create',  async (req, res) => {

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


// PUT Product by ID
/**
 * @swagger
 * /api/product/update/{id}:
 *   put:
 *     summary: Mahsulotni ID orqali yangilash
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilash kerak bo'lgan mahsulotning IDsi
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 * 
 *     responses:
 *       200:
 *         description: Mahsulot muvaffaqiyatli yangilandi
 *       404:
 *         description: Mahsulot topilmadi
 *       500:
 *         description: Xatolik yuz berdi
 */


router.put('/update/:id', async (req, res) => {
    try {
        const updatedProduct = await ProductSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE Product by ID
/**
 * @swagger
 * /api/product/delete/{id}:
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
