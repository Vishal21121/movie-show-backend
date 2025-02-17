import jwt from "jsonwebtoken";
import { db } from "../db/dbConnect.js";
import { users } from "../schema/users.sql";
import { eq } from "drizzle-orm";

const generateRefreshToken = async (id, email, username) => {
  return jwt.sign({ id, email, username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

const generateAccessToken = async (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

const generateTokensAndUpdate = async (userId) => {
  const userFound = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  console.log("userFound", userFound);
  if (!userFound || userFound.length === 0) {
    throw new Error("User does not exist");
  }
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(
    userId,
    userFound.email,
    userFound.password
  );
  const updatedUserId = await db
    .update(users)
    .set({ refresh_token: refreshToken })
    .where(eq(users.id, userId))
    .returning({ updatedId: users.id });
  if (updatedUserId) {
    return { accessToken, refreshToken };
  }
  return null;
};

export { generateTokensAndUpdate };
