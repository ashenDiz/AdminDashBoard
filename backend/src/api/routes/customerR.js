import express from "express";
import {
  signup,
  signin,
  getCustomerProfile,
  updateCustomerProfile,
  deleteCustomerProfile,
  getAllCustomers,
  deleteCustomer,
  getCustomerById,
  updateCustomerById
} from "../controllers/customerC";

const customerRouter = express.Router();

// Signup and Signin routes
customerRouter.post("/signup", signup);
customerRouter.post("/signin", signin);

// User profile routes
customerRouter.get("/all", getAllCustomers);
customerRouter.get("/profile", getCustomerProfile); // Fetch customer profile
customerRouter.put("/", updateCustomerProfile); // Update customer profile
customerRouter.delete("/profile", deleteCustomerProfile); // Delete customer profile
customerRouter.delete("/:id", deleteCustomer);
customerRouter.get("/:id", getCustomerById);
customerRouter.put("/update/:id", updateCustomerById);


export default customerRouter;