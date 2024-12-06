import React, { useState } from "react";
import "../styles/Dashboard.css";
import CustomerRegistrationForm from "./CustomerRegistrationForm";
import ProductRegistrationForm from "./ProductRegistrationForm";
import AllCustomersList from "./AllCustomersList";
import AllProductsList from "./AllProductsList";
import InvoiceForm from "./InvoiceForm";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("customer");

  const renderContent = () => {
    switch (activeMenu) {
      case "customer":
        return <CustomerRegistrationForm />;
      case "allCustomers":
        return <AllCustomersList />;
      case "product":
        return <ProductRegistrationForm />;
      case "allProducts":
        return <AllProductsList />;
      case "InvoiceForm":
        return <InvoiceForm />;
      default:
        return <div>Select a menu option</div>;
    }
  };

  const handleLogout = () => {
    // Clear authentication token and user data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");

    // Redirect to login page
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      <div className="side-menu">
        <h2 className="menu-title">Admin Dashboard</h2>
        <button
          className={`menu-item ${activeMenu === "customer" ? "active" : ""}`}
          onClick={() => setActiveMenu("customer")}
        >
          Customer Registration
        </button>
        <button
          className={`menu-item ${activeMenu === "allCustomers" ? "active" : ""}`}
          onClick={() => setActiveMenu("allCustomers")}
        >
          All Customers
        </button>
        <button
          className={`menu-item ${activeMenu === "product" ? "active" : ""}`}
          onClick={() => setActiveMenu("product")}
        >
          Product Registration
        </button>
        <button
          className={`menu-item ${activeMenu === "allProducts" ? "active" : ""}`}
          onClick={() => setActiveMenu("allProducts")}
        >
          All Products
        </button>
        <button
          className={`menu-item ${activeMenu === "InvoiceForm" ? "active" : ""}`}
          onClick={() => setActiveMenu("InvoiceForm")}
        >
          Create Invoice
        </button>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <div className="content-area">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
