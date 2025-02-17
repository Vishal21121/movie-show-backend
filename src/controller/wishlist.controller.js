import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../db/dbConnect.js";
import { users } from "../schema/users.sql.js";
import { eq } from "drizzle-orm";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { contentWishlist } from "../schema/contentWishlist.sql.js";

// add content
const addContent = asyncHandler(async (req, res) => {
  const { contentId, title, imageUrl, contentType, userId } = req.body;
  const [userFound] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  console.log(userFound);
  if (!userFound) {
    throw new ApiError(400, "Please provide a valid user Id");
  }
  // insert the content
  const [contentInserted] = await db
    .insert(contentWishlist)
    .values({ contentId, title, imageUrl, contentType, userId })
    .returning();
  console.log(contentInserted);
  if (!contentInserted) {
    throw new ApiError(500, "Failed to insert the content");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, contentInserted, "Content added successfully"));
});

// get all contents
// delete content

export { addContent };
