import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { db } from "../db/dbConnect.js";
import { users } from "../schema/users.sql.js";
import { eq } from "drizzle-orm";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const [userFound] = await db
    .select()
    .from(users)
    .where(eq(users.id, decodedToken?.id))
    .limit(1);

  console.log(userFound);

  if (!userFound) {
    throw new ApiError(401, "Token is invalid");
  }

  req.user = userFound;

  return next();
});

export { verifyJWT };
