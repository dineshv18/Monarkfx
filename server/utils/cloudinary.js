import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validate required environment variables
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("CLOUDINARY_CLOUD_NAME environment variable is not defined");
}

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("CLOUDINARY_API_KEY environment variable is not defined");
}

if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("CLOUDINARY_API_SECRET environment variable is not defined");
}

// Upload file to Cloudinary
export const uploadToCloudinary = async (file, folder = "monarkfx") => {
  try {
    const uploadOptions = {
      folder: folder,
      resource_type: "auto",
      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "pdf",
        "mp3",
        "wav",
        "m4a",
      ],
      transformation: [],
    };

    // Add image transformations for images
    if (file.mimetype.startsWith("image/")) {
      uploadOptions.transformation = [
        { width: 800, height: 600, crop: "limit" },
        { quality: "auto:good" },
      ];
    }

    // Convert buffer to base64 string for Cloudinary
    const bufferString = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;

    const result = await cloudinary.uploader.upload(
      bufferString,
      uploadOptions
    );

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};

// Delete file from Cloudinary
export const deleteFromCloudinary = async (fileUrl) => {
  try {
    if (!fileUrl) return;

    // Extract public_id from Cloudinary URL
    const urlParts = fileUrl.split("/");
    const filenameWithExtension = urlParts[urlParts.length - 1];
    const publicId = filenameWithExtension.split(".")[0];

    // Get folder path from URL
    const folderIndex = urlParts.findIndex((part) => part === "upload") + 1;
    const folderPath = urlParts.slice(folderIndex, -1).join("/");
    const fullPublicId = folderPath ? `${folderPath}/${publicId}` : publicId;

    await cloudinary.uploader.destroy(fullPublicId);
    console.log(`Successfully deleted file from Cloudinary: ${fullPublicId}`);
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    // Don't throw error for deletion failures to avoid breaking the app
  }
};

// Get file URL (for compatibility with existing code)
export const getFileUrl = (filename) => {
  if (!filename) return null;

  // If it's already a Cloudinary URL, return as is
  if (filename.includes("cloudinary.com")) {
    return filename;
  }

  // If it's a local filename, construct Cloudinary URL
  // This is for backward compatibility
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/monarkfx/${filename}`;
};

// Upload image with specific folder
export const uploadImage = async (file, folder = "monarkfx/images") => {
  return await uploadToCloudinary(file, folder);
};

// Upload PDF with specific folder
export const uploadPDF = async (file, folder = "monarkfx/pdfs") => {
  return await uploadToCloudinary(file, folder);
};

// Upload audio with specific folder
export const uploadAudio = async (file, folder = "monarkfx/audio") => {
  return await uploadToCloudinary(file, folder);
};

// Upload zoom thumbnail with specific folder
export const uploadZoomThumbnail = async (
  file,
  folder = "monarkfx/zoom-thumbnails"
) => {
  return await uploadToCloudinary(file, folder);
};

export default cloudinary;
