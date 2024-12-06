import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Invoice.css";

const InvoiceForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch customers
  useEffect(() => {
    axios
      .get("http://localhost:8090/customer/all")
      .then((res) => setCustomers(res.data))
      .catch((err) => toast.error("Failed to fetch customers"));
  }, []);

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:8090/api/products/allProducts")
      .then((res) => setProducts(res.data))
      .catch((err) => toast.error("Failed to fetch products"));
  }, []);

  // Handle product selection and quantity change
  const handleAddItem = (productId, quantity) => {
    const product = products.find((p) => p._id === productId);
    if (!product || quantity <= 0) return;

    const itemExists = invoiceItems.find((item) => item.productId === productId);
    if (itemExists) {
      setInvoiceItems((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    } else {
      setInvoiceItems([
        ...invoiceItems,
        { productId, name: product.name, price: product.price, quantity },
      ]);
    }
  };

  // Calculate total amount
  useEffect(() => {
    const total = invoiceItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [invoiceItems]);

  // Submit invoice
  const handleSubmit = async () => {
    if (!selectedCustomer || invoiceItems.length === 0) {
      toast.warn("Please select a customer and add at least one item");
      return;
    }

    const data = {
      customerId: selectedCustomer,
      items: invoiceItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      await axios.post("http://localhost:8090/api/invoice/create", data);
      toast.success("Invoice created successfully!");
      setSelectedCustomer("");
      setInvoiceItems([]);
      setTotalAmount(0);
    } catch (error) {
      toast.error("Failed to create invoice");
    }
  };

  return (
    <div className="invoice-form-container">
      <ToastContainer />
      <h2 className="form-header">Create Invoice</h2>

      {/* Select Customer */}
      <label className="form-label" htmlFor="customer">Select Customer:</label>
      <select
        className="form-select"
        id="customer"
        value={selectedCustomer}
        onChange={(e) => setSelectedCustomer(e.target.value)}
      >
        <option value="">-- Select a Customer --</option>
        {customers.map((customer) => (
          <option key={customer._id} value={customer._id}>
            {customer.firstName} {customer.lastName}
          </option>
        ))}
      </select>

      {/* Add Items */}
      <h3 className="section-header">Add Items</h3>
      {products.map((product) => (
        <div className="product-item" key={product._id}>
          <span className="product-name">{product.name} - ${product.price}</span>
          <input
            className="quantity-input"
            type="number"
            min="1"
            max={product.quantity}
            placeholder="Quantity"
            onChange={(e) =>
              handleAddItem(product._id, parseInt(e.target.value, 10))
            }
          />
        </div>
      ))}

      {/* Invoice Summary */}
      <h3 className="section-header">Invoice Summary</h3>
      <ul className="invoice-summary">
        {invoiceItems.map((item) => (
          <li className="summary-item" key={item.productId}>
            {item.name} - ${item.price} x {item.quantity} = $
            {item.price * item.quantity}
          </li>
        ))}
      </ul>
      <h4 className="total-amount">Total: ${totalAmount}</h4>

      {/* Submit Invoice */}
      <button className="submit-button" onClick={handleSubmit}>
        Submit Invoice
      </button>
    </div>
  );
};

export default InvoiceForm;
