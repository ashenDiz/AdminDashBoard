import express from "express";
import {
  signup,
  signin,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

// Signup and Signin routes
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

// User profile routes
userRouter.get("/profile", getUserProfile); // Fetch user profile
userRouter.put("/profile", updateUserProfile); // Update user profile
userRouter.delete("/profile", deleteUserProfile); // Delete user profile

export default userRouter;