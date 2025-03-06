import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../db/dbConnect.js";
import { users } from "../schema/users.sql.js";
import { count, eq } from "drizzle-orm";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { contentWishlist } from "../schema/contentWishlist.sql.js";

// add content
const addContent = asyncHandler(async (req, res) => {
  const { contentId, title, imageUrl, contentType, userId, description } =
    req.body;
  const [userFound] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  if (!userFound) {
    throw new ApiError(400, "Please provide a valid user Id");
  }

  // before inserting add condition for checking whether it has been added previosly or not

  // insert the content
  const [contentInserted] = await db
    .insert(contentWishlist)
    .values({ contentId, title, imageUrl, contentType, userId, description })
    .returning();
  if (!contentInserted) {
    throw new ApiError(500, "Failed to insert the content");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, contentInserted, "Content added successfully"));
});

// get content based on pagination
const getContentPaginated = asyncHandler(async (req, res) => {
  let { userId, page, limit } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  const result = {
    currentPage: page,
    nextPage: null,
    data: null,
  };

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // count the documents of the user
  const [resultGot] = await db
    .select({ count: count() })
    .from(contentWishlist)
    .where(eq(contentWishlist.userId, userId));

  if (endIndex < resultGot.count) {
    result.nextPage = page + 1;
  } else {
    result.nextPage = null;
  }

  const contentGot = await db
    .select()
    .from(contentWishlist)
    .limit(limit)
    .offset(startIndex);

  if (Array.isArray(contentGot) && contentGot.length == 0) {
    throw new ApiError(404, "Content not found");
  }

  result.data = contentGot;

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Content fetched successfully"));
});

// delete content
const deleteContent = asyncHandler(async (req, res) => {
  const { contentId } = req.body;
  if (!contentId) {
    throw new ApiError(400, "Please provide id of the content");
  }

  const [isContentFound] = await db
    .select()
    .from(contentWishlist)
    .where(eq(contentWishlist.contentId, contentId))
    .limit(1);

  if (!isContentFound) {
    throw new ApiError(400, "Provided id is invalid");
  }

  const [deletedContent] = await db
    .delete(contentWishlist)
    .where(eq(contentWishlist.contentId, contentId))
    .returning();
  if (!deletedContent) {
    throw new ApiError(500, "Failed to delete the content");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, deletedContent, "Content deleted successfully"));
});

export { addContent, getContentPaginated, deleteContent };
