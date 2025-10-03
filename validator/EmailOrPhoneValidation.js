import User from "../models/User.js"; // ⚠️ Make sure "User.js" case matches

export const findUserByEmail = async (email) => {
  return await User.findOne({ email }); // ✅ Correct Mongoose syntax
};
