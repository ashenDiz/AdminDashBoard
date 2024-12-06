import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProductForm = ({ productId, onClose }) => {
  const [product, setProduct] = useState({
    name: "",
    code: "",
    cost: 0,
    price: 0,
    quantity: 0,
    description: "",
  });

  // Fetch product details when the component loads
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/products/getProduct/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to fetch product details.");
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle form submission
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8090/api/products/${productId}`, product);
      toast.success("Product updated successfully!");
      onClose(); // Close the form after update
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="update-form-container">
      <h2>Update Product</h2>
      <form onSubmit={handleUpdateProduct}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Code</label>
          <input
            type="text"
            name="code"
            value={product.code}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Cost</label>
          <input
            type="number"
            name="cost"
            value={product.cost}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit" className="update-btn">Update</button>
        <button type="button" className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
