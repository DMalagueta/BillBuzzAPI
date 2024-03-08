// src/services/authService.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User'; 

export const registerUser = async (username: string, email: string, password: string) => {
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  // Generate a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET!, { expiresIn: '1h' });

  return token;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User does not exist');

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) throw new Error('Invalid password');

  // Generate a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET!, { expiresIn: '1h' });

  return token;
};
