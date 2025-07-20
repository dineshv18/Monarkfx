// Cloudinary URL utility functions

export const getCloudinaryUrl = (
  imagePath: string | null | undefined,
  folder: string = "monarkfx/courses"
): string => {
  if (!imagePath) return "https://placehold.co/600x400?text=No+Image";

  // If it's already a Cloudinary URL, return as is
  if (imagePath.includes("cloudinary.com")) {
    return imagePath;
  }

  // If it's a full URL (not Cloudinary), return as is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Construct Cloudinary URL
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "riteshk";
  return `https://res.cloudinary.com/${cloudName}/image/upload/${folder}/${imagePath}`;
};

export const getCourseImageUrl = (
  imagePath: string | null | undefined
): string => {
  return getCloudinaryUrl(imagePath, "monarkfx/courses");
};

export const getZoomThumbnailUrl = (
  imagePath: string | null | undefined
): string => {
  return getCloudinaryUrl(imagePath, "monarkfx/zoom-thumbnails");
};

export const getPdfUrl = (
  pdfPath: string | null | undefined
): string | null => {
  if (!pdfPath) return null;

  // If it's already a Cloudinary URL, return as is
  if (pdfPath.includes("cloudinary.com")) {
    return pdfPath;
  }

  // If it's a full URL (not Cloudinary), return as is
  if (pdfPath.startsWith("http")) {
    return pdfPath;
  }

  // Construct Cloudinary URL for PDF
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "riteshk";
  return `https://res.cloudinary.com/${cloudName}/raw/upload/monarkfx/pdfs/${pdfPath}`;
};

export const getAudioUrl = (
  audioPath: string | null | undefined
): string | null => {
  if (!audioPath) return null;

  // If it's already a Cloudinary URL, return as is
  if (audioPath.includes("cloudinary.com")) {
    return audioPath;
  }

  // If it's a full URL (not Cloudinary), return as is
  if (audioPath.startsWith("http")) {
    return audioPath;
  }

  // Construct Cloudinary URL for audio
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "riteshk";
  return `https://res.cloudinary.com/${cloudName}/video/upload/monarkfx/audio/${audioPath}`;
};

// Check if a URL is a Cloudinary URL
export const isCloudinaryUrl = (url: string | null | undefined): boolean => {
  return url?.includes("cloudinary.com") || false;
};

// Extract public ID from Cloudinary URL
export const getCloudinaryPublicId = (url: string): string | null => {
  if (!isCloudinaryUrl(url)) return null;

  try {
    const urlParts = url.split("/");
    const uploadIndex = urlParts.findIndex((part) => part === "upload");
    if (uploadIndex === -1) return null;

    const publicIdParts = urlParts.slice(uploadIndex + 1);
    return publicIdParts.join("/");
  } catch (error) {
    return null;
  }
};
