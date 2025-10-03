import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/User.js'; // Import the Mongoose User model

// Update User
const updateUser = async (userId, updateData) => {
  console.log(userId, "min")
  return await User.findByIdAndUpdate(userId, updateData, { new: true }); // Return the updated document
};

// Get User Details
const getUserDetails = async (userId) => {
  return await User.findById(userId);
};

// Get User by ID
const getUserById = async (userId) => {
  return await User.findById(userId);
};

const getAllUsers = async (page = 1, limit = 10) => {
  // Validate page and limit
  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  // Fetch users with pagination
  const users = await User.find().skip(skip).limit(limit).exec();
  const totalUsers = await User.countDocuments(); // Count total documents

  return {
    totalUsers,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page,
    users,
  };
};

// Delete User
const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};



// Edit Password
const editPassword = async (userId, oldPassword, newPassword) => {
  console.log(userId)
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error('Incorrect old password');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
};

export default {
  updateUser,
  getUserDetails,
  getUserById,
  getAllUsers,
  deleteUser,
  editPassword,
};
