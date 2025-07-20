// utils/fileHandlers.js
import multer from "multer";
import {
  uploadImage,
  uploadPDF,
  uploadAudio,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

// Set up multer storage
const storage = multer.memoryStorage();
export const uploadFiles = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for PDFs and audio
});

// Function to process and upload image
export const processAndUploadImage = async (file) => {
  const { originalname, buffer } = file;

  try {
    // Skip Sharp processing for now to avoid issues
    // const processedBuffer = await sharp(buffer)
    //   .resize(800)
    //   .jpeg({ quality: 80 })
    //   .toBuffer();

    // Create a new file object with original buffer
    const processedFile = {
      ...file,
      buffer: buffer, // Use original buffer instead of processed
      mimetype: file.mimetype, // Keep original mimetype
    };

    const fileUrl = await uploadImage(processedFile, "monarkfx/courses");

    return fileUrl;
  } catch (error) {
    console.error("Image processing/upload failed:", error);
    throw error;
  }
};

// Function to upload PDF
export const uploadPDFFile = async (file) => {
  try {
    const fileUrl = await uploadPDF(file, "monarkfx/pdfs");
    return fileUrl;
  } catch (error) {
    console.error("PDF upload failed:", error);
    throw error;
  }
};

// Function to upload Audio
export const uploadAudioFile = async (file) => {
  try {
    const fileUrl = await uploadAudio(file, "monarkfx/audio");
    return fileUrl;
  } catch (error) {
    console.error("Audio upload failed:", error);
    throw error;
  }
};

// Middleware to handle file processing
export const processFiles = async (req, res, next) => {
  try {
    // Process thumbnail/image if exists
    if (req.files?.thumbnail) {
      const fileUrl = await processAndUploadImage(req.files.thumbnail[0]);
      req.files.thumbnail[0].filename = fileUrl;
    }

    // Process PDF if exists
    if (req.files?.pdf) {
      const fileUrl = await uploadPDFFile(req.files.pdf[0]);
      req.files.pdf[0].filename = fileUrl;
    }

    // Process audio if exists
    if (req.files?.audio) {
      const fileUrl = await uploadAudioFile(req.files.audio[0]);
      req.files.audio[0].filename = fileUrl;
    }

    next();
  } catch (error) {
    console.error("processFiles middleware error:", error);
    next(error);
  }
};

// Get file URL from filename (for compatibility)
export const getFileUrl = (filename) => {
  if (!filename) return null;

  // If it's already a Cloudinary URL, return as is
  if (filename.includes("cloudinary.com")) {
    return filename;
  }

  // For backward compatibility with existing filenames
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/monarkfx/${filename}`;
};

// Delete file from Cloudinary
export const deleteFile = async (fileUrl) => {
  try {
    // Add debugging to see what's being passed
    console.log("deleteFile called with:", typeof fileUrl, fileUrl);

    // Check if fileUrl is a Buffer or not a string
    if (Buffer.isBuffer(fileUrl)) {
      return; // Don't try to delete a Buffer
    }

    if (typeof fileUrl !== "string") {
      console.error("deleteFile received non-string:", typeof fileUrl, fileUrl);
      return; // Don't try to delete non-string
    }

    await deleteFromCloudinary(fileUrl);
    console.log(`File deleted from Cloudinary: ${fileUrl}`);
  } catch (error) {
    console.error("File deletion error:", error);
    // Don't throw error to avoid breaking the app
  }
};
