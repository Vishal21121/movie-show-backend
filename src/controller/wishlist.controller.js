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
const getAllContents = asyncHandler(async (req, res) => {
  const allContents = await db.select().from(contentWishlist);
  return res
    .status(200)
    .json(new ApiResponse(200, allContents, "Content fetched successfully"));
});

// delete content
const deleteContent = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new ApiError(400, "Please provide id of the content");
  }

  const [isContentFound] = await db
    .select()
    .from(contentWishlist)
    .where(eq(contentWishlist.id, id))
    .limit(1);

  if (!isContentFound) {
    throw new ApiError(400, "Provided id is invalid");
  }

  const [deletedContent] = await db
    .delete(contentWishlist)
    .where(eq(contentWishlist.id, id))
    .returning();
  if (!deletedContent) {
    throw new ApiError(500, "Failed to delete the content");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, deletedContent, "Content deleted successfully"));
});

export { addContent, getAllContents, deleteContent };
