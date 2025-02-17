import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../db/dbConnect.js";
import { users } from "../schema/users.sql.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { hashPassword } from "../utils/password.js";
import { eq } from "drizzle-orm";
import { toCamelCase } from "drizzle-orm/casing";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const isEmailExists = await db
    .select()
    .from(users, toCamelCase)
    .where(eq(users.email, email));
  if (Array.isArray(isEmailExists) && isEmailExists.length > 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "User with this email already exists"));
  }

  const isusernameExists = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  if (Array.isArray(isusernameExists) && isusernameExists.length > 0) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, "User with this username already exists")
      );
  }

  const hashedPassword = await hashPassword(password);
  const userInserted = await db
    .insert(users)
    .values({
      username,
      email,
      password: hashedPassword,
      refresh_token: "",
      is_email_verified: false,
    })
    .returning({
      id: users.id,
      username: users.username,
      email: users.email,
      isEmailVerified: users.isEmailVerified,
    });
  if (!userInserted) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to insert user"));
  }
  return res
    .status(201)
    .json(new ApiResponse(201, userInserted, "User inserted successfully"));
});

export { registerUser };
