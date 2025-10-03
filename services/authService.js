import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { generateJwt } from '../helpers/generateToken.js';

const registerUser = async ({ email, password, profile, role }) => {
  if (!email) {
    throw new Error('Email is required.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    email,
    password: hashedPassword,
    role: role || "candidate", // default candidate
    profile: profile || {},
  };

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with the same email');
    }

    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error('User registration failed');
  }
};

const registerAdmin = async ({ email, password }) => {
  if (!email) {
    throw new Error('Email is required.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    email,
    password: hashedPassword,
    role: "admin",
  };

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Admin already exists with the same email');
    }

    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error("Error registering admin:", error);
    throw new Error('Admin registration failed');
  }
};

const login = async ({ email, password }) => {
  if (!email) throw new Error('Email is required');

  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  console.log({
    password, user:user.password
  })

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  console.log({
    isMatch
  })

  const jwtToken = await generateJwt({ userId: user._id, role: user.role });
  return { user, token: jwtToken };
};

export default { registerUser, registerAdmin, login };
