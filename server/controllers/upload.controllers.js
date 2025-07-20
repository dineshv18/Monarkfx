import { v4 as uuidv4 } from "uuid";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";
import { uploadZoomThumbnail as uploadToCloudinary } from "../utils/cloudinary.js";

// Upload zoom session thumbnail
export const uploadZoomThumbnail = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }

    const file = req.file;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new ApiError(400, "Only JPEG, PNG, WebP files are allowed");
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      throw new ApiError(
        400,
        "File size too large. Maximum allowed size is 2MB"
      );
    }

    // Upload to Cloudinary
    const fileUrl = await uploadToCloudinary(file, "monarkfx/zoom-thumbnails");

    return res
      .status(200)
      .json(
        new ApiResponsive(200, { url: fileUrl }, "File uploaded successfully")
      );
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to upload file"
    );
  }
});
