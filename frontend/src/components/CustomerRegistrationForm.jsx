import React, { useState } from "react";
import axios from "axios"; // For HTTP requests
import { toast } from "react-toastify"; // For notifications
import "react-toastify/dist/ReactToastify.css"; // Toast CSS

const CustomerRegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    const customerData = { firstName, lastName, email, contact, password };

    try {
      const response = await axios.post("http://localhost:8090/customer/signup", customerData);
      toast.success("Customer registered successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setContact("");
      setPassword("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register customer. Please try again later.");
    }
  };

  return (
    <div className="form-container">
      <h2>Customer Registration</h2>
      <form onSubmit={handleCustomerSubmit}>
        <label>First Name</label>
        <input
          type="text"
          placeholder="Enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Contact</label>
        <input
          type="text"
          placeholder="Enter contact number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register Customer</button>
      </form>
    </div>
  );
};

export default CustomerRegistrationForm;
