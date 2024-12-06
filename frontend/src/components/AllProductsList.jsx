import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateProductForm from "./UpdateProductForm";

const AllProductsList = () => {
  const [products, setProducts] = useState([]);
  const [updateProductId, setUpdateProductId] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8090/api/products/allProducts");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load products.");
      }
    };

    fetchAllProducts();
  }, [products]);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/products/${id}`);
      toast.success("Product deleted successfully!");
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product.");
    }
  };

  const handleUpdateClick = (id) => {
    setUpdateProductId(id); // Open the update form with the selected product ID
  };

  const closeUpdateForm = () => {
    setUpdateProductId(null); // Close the update form
  };

  return (
    <div className="list-container">
      <h2>All Products</h2>
      {updateProductId ? (
        <UpdateProductForm productId={updateProductId} onClose={closeUpdateForm} />
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.code}</td>
                <td>${product.cost.toFixed(2)}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>{product.description || "N/A"}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdateClick(product._id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProductsList;
