# Cloudinary Migration Guide

## Overview

This project has been migrated from S3/DigitalOcean Spaces to Cloudinary for all file uploads including:

- Course thumbnails
- Chapter PDFs
- Chapter audio files
- Zoom session thumbnails

## Environment Variables Required

Add these environment variables to your `.env` file:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="riteshk"
CLOUDINARY_API_KEY="617434973527127"
CLOUDINARY_API_SECRET="6rwV0KZJcvXc8IN8igluH-9uZUM"

# Client-side Cloudinary URL (for frontend)
NEXT_PUBLIC_CLOUDINARY_URL="https://api.cloudinary.com/v1_1/riteshk/image/upload"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="nifty_unsigned"
```

## Folder Structure in Cloudinary

Files will be organized in the following folders:

- `monarkfx/courses` - Course thumbnails
- `monarkfx/pdfs` - Chapter PDF files
- `monarkfx/audio` - Chapter audio files
- `monarkfx/zoom-thumbnails` - Zoom session thumbnails
- `monarkfx/images` - General images

## Changes Made

### Server-side Changes:

1. **New Cloudinary utility** (`server/utils/cloudinary.js`)

   - Handles file uploads to Cloudinary
   - Manages file deletions
   - Provides URL generation

2. **Updated upload controller** (`server/controllers/upload.controllers.js`)

   - Now uses Cloudinary for zoom thumbnails

3. **Updated multer middleware** (`server/middlewares/multer.middlerware.js`)

   - Processes and uploads images, PDFs, and audio to Cloudinary
   - Maintains backward compatibility

4. **Updated course controller** (`server/controllers/course.controllers.js`)

   - Course thumbnails now upload to Cloudinary

5. **Updated chapter controller** (`server/controllers/chapter.controllers.js`)
   - Chapter PDFs and audio files now upload to Cloudinary

### Client-side Changes:

1. **Updated Next.js config** (`client/next.config.mjs`)

   - Added Cloudinary domain to allowed image sources

2. **Updated components** to handle Cloudinary URLs:
   - `CourseCard.tsx`
   - `FileUpload.tsx`
   - `CourseForm.tsx`
   - `EnhancedCourseCard.tsx`
   - `SecureChainCourseCard.tsx`

## Backward Compatibility

The system maintains backward compatibility with existing S3/DigitalOcean Spaces URLs. Files will be served from their original location if they don't contain "cloudinary.com" in the URL.

## Installation

1. Install Cloudinary package:

```bash
cd server
npm install cloudinary
```

2. Add environment variables to your `.env` file

3. Restart your server

## Benefits of Cloudinary Migration

1. **Better Image Optimization**: Automatic image transformations and optimization
2. **CDN**: Global content delivery network for faster loading
3. **Simplified Management**: No need to manage S3 buckets and permissions
4. **Cost Effective**: Pay-as-you-go pricing model
5. **Better Developer Experience**: Easier API and better documentation

## Migration Notes

- Existing files in S3/DigitalOcean Spaces will continue to work
- New uploads will go to Cloudinary
- File deletion now uses Cloudinary's API
- All file URLs are now Cloudinary URLs for new uploads

## Testing

After migration, test the following:

1. Course thumbnail uploads
2. Chapter PDF uploads
3. Chapter audio uploads
4. Zoom session thumbnail uploads
5. File deletions
6. Image display in course cards and forms
