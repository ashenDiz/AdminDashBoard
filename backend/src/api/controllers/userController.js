import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "RECIPEAPI";


const signup = async (req, res) => {
  const { firstName, lastName, contact, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      firstName,
      lastName,
      contact,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({ result: existingUser, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.id;

    const { firstName, lastName, contact } = req.body;
    const updatedUserProfile = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, contact },
      { new: true }
    );
    res.status(200).json(updatedUserProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.id;

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



export { signup, signin, getUserProfile, updateUserProfile, deleteUserProfile };
