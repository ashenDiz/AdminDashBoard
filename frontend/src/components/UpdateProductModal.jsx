import React, { useState } from "react";
import "../styles/UpdateProductModal.css";

const UpdateProductModal = ({ product, onUpdate, onClose }) => {
  const [name, setName] = useState(product.name);
  const [code, setCode] = useState(product.code);
  const [cost, setCost] = useState(product.cost);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [description, setDescription] = useState(product.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      name,
      code,
      cost,
      price,
      quantity,
      description,
    };
    onUpdate(updatedProduct);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Product Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <label>Cost</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
            min="0"
          />
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
          />
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="0"
          />
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="modal-actions">
            <button type="submit" className="save-btn">
              Save Changes
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
