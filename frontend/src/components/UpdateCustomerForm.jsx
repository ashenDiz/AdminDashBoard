import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateCustomerForm = ({ customerId, onClose }) => {
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/customer/${customerId}`);
        setCustomer(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch customer details.");
      }
    };

    if (customerId) {
      fetchCustomer();
    }
  }, [customerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8090/customer/update/${customerId}`, customer);
      toast.success("Customer updated successfully!");
      onClose(); // Close the form after updating
    } catch (error) {
      console.error(error);
      toast.error("Failed to update customer.");
    }
  };

  return (
    <div className="update-form-container">
      <h2>Update Customer</h2>
      <form onSubmit={handleUpdateCustomer}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={customer.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={customer.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={customer.contact}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="update-btn">Update</button>
        <button type="button" className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateCustomerForm;
