import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productC.js";

const productRouter = express.Router();

// Route for fetching all products
productRouter.get("/allProducts", getAllProducts);

// Route for fetching a product by ID
productRouter.get("/getProduct/:id", getProductById);

// Route for creating a new product
productRouter.post("/", createProduct);

// Route for updating a product by ID
productRouter.put("/:id", updateProduct);

// Route for deleting a product by ID
productRouter.delete("/:id", deleteProduct);

export default productRouter;
