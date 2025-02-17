import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../db/dbConnect.js";
import { users } from "../schema/users.sql.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { hashPassword, isPasswordCorrect } from "../utils/password.js";
import { eq } from "drizzle-orm";
import { toCamelCase } from "drizzle-orm/casing";
import { ApiError } from "../utils/ApiError.js";
import { generateTokensAndUpdate } from "../utils/tokens.js";

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

const loginUser = asyncHandler(async (req, res) => {
  // get user details from body
  const { email, password } = req.body;
  // find user from db using email
  const userFound = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (Array.isArray(userFound) && userFound.length === 0) {
    throw new ApiError(401, "Please provide valid credentials");
  }
  // verify password
  const isCorrect = isPasswordCorrect(password, userFound[0].password);
  if (!isCorrect) {
    throw new ApiError(401, "Please provide valid credentials");
  }
  // generate tokens
  const tokens = await generateTokensAndUpdate(userFound[0].id);
  if (!tokens) {
    throw new ApiError(500, "Failed to login user");
  }
  // provide refresh token in cookies and accessToken as data
  const [userGot] = await db
    .select({
      id: users.id,
      email: users.email,
      isEmailVerified: users.isEmailVerified,
      username: users.username,
    })
    .from(users)
    .where(eq(users.email, email));
  const options = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 2 * 24 * 60 * 60 * 1000,
  };
  return res
    .status(200)
    .cookie("refreshToken", tokens.refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken: tokens.accessToken, userData: userGot },
        "User logged in successfully"
      )
    );
});

export { registerUser, loginUser };
