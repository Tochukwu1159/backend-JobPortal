import User from "../models/user.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({
    where: { email }
  });
};
