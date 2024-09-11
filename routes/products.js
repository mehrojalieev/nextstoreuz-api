// Get All Products
/**
 * @swagger
 * /product/all:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successfully retrieved all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get('/all', async (req, res) => {
    try {
        const allProducts = await ProductSchema.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Product by ID
/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
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

// Create Product
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
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/create', async (req, res) => {
    const { error, value } = productValidationSchema.validate(req.body, { stripUnknown: true });

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const newProduct = new ProductSchema(value);
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Product by ID
/**
 * @swagger
 * /product/delete/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully
 *                 Product:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
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
