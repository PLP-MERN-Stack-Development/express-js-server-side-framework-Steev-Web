const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const Product = require('../models/products');

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET product by ID (UUID)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE one or multiple products
router.post('/', async (req, res) => {
  try {
    const data = req.body;

    // ✅ If the request body is an array → insert multiple products
    if (Array.isArray(data)) {
      // Automatically add UUIDs to each product
      const productsWithIds = data.map(product => ({
        id: uuidv4(),
        ...product
      }));

      const newProducts = await Product.insertMany(productsWithIds);
      return res.status(201).json({
        message: `${newProducts.length} products added successfully`,
        products: newProducts
      });
    }

    // ✅ If it's a single object → create just one product
    const { name, description, price, category, inStock } = data;

    const product = new Product({
      id: uuidv4(),
      name,
      description,
      price,
      category,
      inStock
    });

    const newProduct = await product.save();
    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// UPDATE product by UUID
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedProduct)
            return res.status(404).json({ message: 'Product not found' });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE product by UUID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ id: req.params.id });
        if (!deletedProduct)
            return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;