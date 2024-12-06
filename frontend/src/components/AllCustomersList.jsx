import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateCustomerForm from "./UpdateCustomerForm";

const AllCustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [updateCustomerId, setUpdateCustomerId] = useState(null);

  // Fetch all customers
  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8090/customer/all");
        setCustomers(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load customers.");
      }
    };

    fetchAllCustomers();
  }, []);

  // Delete a customer
  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/customer/${id}`);
      toast.success("Customer deleted successfully!");
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete customer.");
    }
  };

  // Open update form
  const handleUpdateClick = (id) => {
    setUpdateCustomerId(id); // Open the update form with the selected customer ID
  };

  // Close update form
  const closeUpdateForm = () => {
    setUpdateCustomerId(null); // Close the update form
  };

  return (
    <div className="list-container">
      <h2>All Customers</h2>
      {updateCustomerId ? (
        <UpdateCustomerForm customerId={updateCustomerId} onClose={closeUpdateForm} />
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>
                  {customer.firstName} {customer.lastName}
                </td>
                <td>{customer.email}</td>
                <td>{customer.contact}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdateClick(customer._id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCustomer(customer._id)}
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

export default AllCustomersList;
