import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  return (await bcrypt.hash(password, 10)).substring(0, 49);
};

const isPasswordCorrect = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export { hashPassword, isPasswordCorrect };
