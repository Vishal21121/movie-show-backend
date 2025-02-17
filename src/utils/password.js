import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  return (await bcrypt.hash(password, 10)).substring(0, 49);
};

const isPasswordCorrect = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashPassword);
};

export { hashPassword, isPasswordCorrect };
