import React, { useState } from "react";
import axios from "axios"; // For HTTP requests
import { toast } from "react-toastify"; // For notifications
import "react-toastify/dist/ReactToastify.css"; // Toast CSS

const ProductRegistrationForm = () => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [cost, setCost] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
  
    const handleProductSubmit = async (e) => {
      e.preventDefault();
      const productData = { name, code, cost, price, quantity, description };
  
      try {
        const response = await axios.post("http://localhost:8090/api/products", productData);
        console.log(response.data);
        toast.success("Product registered successfully!");
        setName("");
        setCode("");
        setCost("");
        setPrice("");
        setQuantity("");
        setDescription("");
      } catch (error) {
        console.error(error);
        toast.error("Failed to register product. Please try again later.");
      }
    };
  
    return (
      <div className="form-container">
        <h2>Product Registration</h2>
        <form onSubmit={handleProductSubmit}>
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
  
          <label>Product Code</label>
          <input
            type="text"
            placeholder="Enter product code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
  
          <label>Cost</label>
          <input
            type="number"
            placeholder="Enter product cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
            min="0"
          />
  
          <label>Price</label>
          <input
            type="number"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
          />
  
          <label>Quantity</label>
          <input
            type="number"
            placeholder="Enter product quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="0"
          />
  
          <label>Description</label>
          <textarea
            placeholder="Enter product description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
  
          <button type="submit">Register Product</button>
        </form>
      </div>
    );
  };

  export default ProductRegistrationForm;