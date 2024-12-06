import Product from "../models/productM.js";

// Get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a product by ID
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res, next) => {
  try {
    const { name, code, cost, price, quantity, description } = req.body;
    const product = new Product({ name, code, cost, price, quantity, description });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, code, cost, price, quantity, description } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, code, cost, price, quantity, description },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(204).end(); // Successfully deleted, no content to return
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
