import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";
import * as authService from "../services/authService";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate and send the token
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: "24h",
      }
    );
    
    res.json({ token: token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred during the login process" });
  }
});

// GET a user by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    // Compare the request param ID with the authenticated user's ID
    if (req.params.id !== req.userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// User registration
router.post("/register", async (req, res) => {
  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).send("Email already exists");

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user
    const savedUser = await user.save();

    // Generate a token for the new user
    const token = jwt.sign(
      { _id: savedUser._id },
      process.env.TOKEN_SECRET as string,
      { expiresIn: "24h" }
    );

    // Respond with the user's ID and the token
    res.status(201).send({ userId: savedUser._id, token });
  } catch (error) {
    res.status(500).send(error); // Send error message for debugging
  }
});

// UPDATE a user by ID
router.put("/:id", verifyToken, async (req, res) => {
  // Optional: Add logic to handle password changes (rehashing, etc.)
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE a user by ID
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send("User deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
