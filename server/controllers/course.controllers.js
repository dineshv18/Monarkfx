import { prisma } from "../config/db.js";
import { createSlug } from "../helper/Slug.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, "../public/upload");

const validateCourseData = (title, description) => {
  if (!title?.trim() || !description?.trim()) {
    throw new ApiError(
      400,
      "Please provide all required fields (title, description)"
    );
  }
};

const findCourseBySlug = async (slug) => {
  const course = await prisma.course.findUnique({
    where: { slug },
  });
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  return course;
};

const handleFileUpload = (file) => {
  if (!file?.filename) {
    throw new ApiError(400, "Please provide a thumbnail for the course");
  }
  return file.filename;
};

const deleteFile = async (filename) => {
  try {
    await fs.unlink(path.join(UPLOAD_DIR, filename));
  } catch (error) {
    console.error("Failed to delete file:", error);
  }
};

const createMetaDescription = (description) => {
  if (!description) return "";

  const cleanText = description
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleanText.length > 160
    ? cleanText.substring(0, 160) + "..."
    : cleanText;
};

export const createCourse = asyncHandler(async (req, res) => {
  let uploadedThumbnail = null;
  try {
    if (req.file) {
      uploadedThumbnail = handleFileUpload(req.file);
    }

    const {
      title,
      description,
      price,
      salePrice,
      isPublished,
      language,
      subheading,
      videoUrl,
      slug,
      paid,
      isFeatured,
      isPopular,
      isTrending,
      isBestseller,
      categoryId
    } = req.body;

    // Get meta fields separately
    let { metaTitle, metaDesc } = req.body;

    validateCourseData(title, description);

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });
  
    if (!category) {
      throw new ApiError(400, "Invalid category");
    }

    // Generate meta fields
    const finalMetaTitle = metaTitle || title;
    const finalMetaDesc = metaDesc || createMetaDescription(description);

    // Create unique slug
    let uniqueSlug = slug ? createSlug(slug) : createSlug(title);
    let existingSlug = await prisma.course.findUnique({
      where: { slug: uniqueSlug },
    });
    let counter = 1;

    while (existingSlug) {
      uniqueSlug = `${createSlug(slug || title)}-${counter}`;
      existingSlug = await prisma.course.findUnique({
        where: { slug: uniqueSlug },
      });
      counter++;
    }

    const parseBooleanField = (field) => {
      if (field === "true" || field === true) return true;
      if (field === "false" || field === false) return false;
      return false;
    };

    const course = await prisma.course.create({
      data: {
        title: title.toLowerCase().trim(),
        description: description.toLowerCase(),
        slug: uniqueSlug,
        price: price ? parseFloat(price) : 0,
        salePrice: salePrice ? parseFloat(salePrice) : 0,
        thumbnail: uploadedThumbnail,
        userId: req.user.id,
        isPublished: parseBooleanField(isPublished),
        language: language?.toLowerCase(),
        subheading: subheading?.trim(),
        metaTitle: finalMetaTitle.trim(),
        metaDesc: finalMetaDesc.trim(),
        isFeatured: parseBooleanField(isFeatured),
        isPopular: parseBooleanField(isPopular),
        isTrending: parseBooleanField(isTrending),
        isBestseller: parseBooleanField(isBestseller),
        videoUrl,
        paid: parseBooleanField(paid),
        categoryId
      },
    });

    return res
      .status(201)
      .json(new ApiResponsive(201, "Course created successfully", course));
  } catch (error) {
    if (uploadedThumbnail) {
      await deleteFile(uploadedThumbnail);
    }
    throw error;
  }
});

export const getCourses = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;
  const search = req.query.search;
  const category = req.query.category;
  const sort = req.query.sort;

  const where = {
    isPublished: true,
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } }
      ]
    }),
    ...(category && category !== "all" && { categoryId: category })
  };

  let orderBy = {};
  switch (sort) {
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    case "price_high":
      orderBy = { price: "desc" };
      break;
    case "price_low":
      orderBy = { price: "asc" };
      break;
    default: // newest
      orderBy = { createdAt: "desc" };
  }

  const [courses, totalCourses] = await Promise.all([
    prisma.course.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      }
    }),
    prisma.course.count({ where })
  ]);

  return res.status(200).json(
    new ApiResponsive(200, {
      courses,
      totalPages: Math.ceil(totalCourses / limit),
      currentPage: page
    })
  );
});

export const getCourseall = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const course = await prisma.section.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      Section: {
        select: {
          id: true,
          slug: true,
          position: true,
          chapters: {
            select: {
              id: true,
              title: true,
              description: true,
              isFree: true,
              position: true,
              videoUrl: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return res
    .status(200)
    .json(new ApiResponsive(200, "Course retrieved successfully", course));
});

export const getCourse = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const course = await prisma.course.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      description: true,
      thumbnail: true,
      price: true,
      salePrice: true,
      slug: true,
      paid: true,
      isBestseller: true,
      isTrending: true,
      isPopular: true,
      isFeatured: true,
      videoUrl: true,
      language: true,
      isPublished: true,
      isPublic: true,
      createdAt: true,
      updatedAt: true,
      metaDesc: true,
      metaTitle: true,
      subheading: true,
      categoryId: true,
      userId: true,
      
      // Add category with required fields
      category: {
        select: {
          id: true,
          name: true
        }
      },
      
      sections: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          title: true,
          position: true,
          isPublished: true,
          isFree: true,
          slug: true,
          courseId: true,
          createdAt: true,
          updatedAt: true,
          chapters: {
            orderBy: {
              position: "asc",
            },
            select: {
              id: true,
              title: true,
              description: true,
              position: true,
              isPublished: true,
              isFree: true,
              slug: true,
              sectionId: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      }
    },
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return res
    .status(200)
    .json(new ApiResponsive(200, course, "Course retrieved successfully"));
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      Section: {
        include: {
          chapters: true,
        },
      },
    },
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // Delete all related data
  await prisma.$transaction(async (tx) => {
    // Delete chapters
    for (const section of course.Section) {
      await tx.chapter.deleteMany({
        where: { sectionId: section.id },
      });
    }

    // Delete sections
    await tx.section.deleteMany({
      where: { courseId: course.id },
    });

    // Delete enrollments
    await tx.enrollment.deleteMany({
      where: { courseId: course.id },
    });

    // Delete the course
    await tx.course.delete({
      where: { id: course.id },
    });
  });

  // Delete thumbnail
  if (course.thumbnail) {
    await deleteFile(course.thumbnail);
  }

  return res
    .status(200)
    .json(
      new ApiResponsive(200, "Course and related data deleted successfully")
    );
});

export const updateCourseImage = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const course = await findCourseBySlug(slug);

  const thumbnail = handleFileUpload(req.file);

  await prisma.course.update({
    where: { slug },
    data: { thumbnail },
  });

  if (course.thumbnail) {
    await deleteFile(course.thumbnail);
  }

  return res.status(200).json(
    new ApiResponsive(200, "Course thumbnail updated successfully", {
      thumbnail,
    })
  );
});

export const coursePublishToggle = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const course = await findCourseBySlug(slug);

  const updatedCourse = await prisma.course.update({
    where: { slug },
    data: { isPublished: !course.isPublished },
  });

  return res
    .status(200)
    .json(
      new ApiResponsive(
        `Course ${
          updatedCourse.isPublished ? "published" : "unpublished"
        } successfully`,
        { isPublished: updatedCourse.isPublished },
        200
      )
    );
});

export const searchCourses = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    throw new ApiError(400, "Please provide a search query");
  }

  const courses = await prisma.course.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
  });

  return res
    .status(200)
    .json(new ApiResponsive(200, "Courses retrieved successfully", courses));
});

export const getNewCourses = asyncHandler(async (req, res) => {
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "asc" },
    take: 8,
  });

  return res
    .status(200)
    .json(
      new ApiResponsive(200, "New courses retrieved successfully", courses)
    );
});

export const DraftCourse = asyncHandler(async (req, res) => {
  const courses = await prisma.course.findMany({
    where: { isPublished: false },
  });

  return res.status(200).json(
    new ApiResponsive(200, "Draft Courses retrieved successfully", {
      courses,
    })
  );
});

export const coursePage = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const course = await prisma.course.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      description: true,
      thumbnail: true,
      price: true,
      salePrice: true,
      paid: true,
      language: true,
      videoUrl: true,
      isBestseller: true,
      isTrending: true,
      isPopular: true,
      isFeatured: true,
      metaDesc: true,
      metaTitle: true,
      subheading: true,
      Section: {
        where: { isPublished: true },
        orderBy: { position: "asc" },
        select: {
          id: true,
          title: true,
          chapters: {
            where: { isPublished: true },
            orderBy: { position: "asc" },
            select: {
              id: true,
              title: true,
              isFree: true,
              description: true,
              videoUrl: false,
            },
          },
        },
      },
    },
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return res
    .status(200)
    .json(new ApiResponsive(200, course, "Course retrieved successfully"));
});

export const getFreeChapterVideo = asyncHandler(async (req, res) => {
  const { courseSlug, chapterId } = req.params;

  // Find course and specific chapter
  const course = await prisma.course.findFirst({
    where: {
      slug: courseSlug,
      isPublished: true
    },
    include: {
      Section: {
        where: {
          isPublished: true
        },
        include: {
          chapters: {
            where: {
              id: chapterId,
              isPublished: true
            }
          }
        }
      }
    }
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // Find the chapter across all sections
  const chapter = course.Section
    .flatMap(section => section.chapters)
    .find(chapter => chapter?.id === chapterId);

  if (!chapter) {
    throw new ApiError(404, "Chapter not found");
  }

  // Check if chapter is free
  if (!chapter.isFree) {
    throw new ApiError(403, "This is a premium chapter");
  }

  return res.status(200).json(
    new ApiResponsive(
      200,
      { videoUrl: chapter.videoUrl },
      "Chapter video URL retrieved successfully"
    )
  );
});

export const updateCourse = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const {
    title,
    description,
    price,
    salePrice,
    language,
    subheading,
    metaTitle,
    metaDesc,
    videoUrl,
    paid,
    isPublished,
    isFeatured,
    isPopular,
    isTrending,
    isBestseller,
  } = req.body;

  const updateData = {};

  if (title !== undefined) updateData.title = title.toLowerCase();
  if (description !== undefined) updateData.description = description;
  if (language !== undefined) updateData.language = language.toLowerCase();
  if (subheading !== undefined) updateData.subheading = subheading.trim();
  if (metaTitle !== undefined) updateData.metaTitle = metaTitle;
  if (metaDesc !== undefined) updateData.metaDesc = metaDesc;
  if (videoUrl !== undefined) updateData.videoUrl = videoUrl;
  if (paid !== undefined) updateData.paid = paid;
  if (isPublished !== undefined) updateData.isPublished = isPublished;
  if (isFeatured !== undefined) updateData.isFeatured = isFeatured;
  if (isPopular !== undefined) updateData.isPopular = isPopular;
  if (isTrending !== undefined) updateData.isTrending = isTrending;
  if (isBestseller !== undefined) updateData.isBestseller = isBestseller;
  if (price !== undefined) {
    updateData.price = price ? parseFloat(price) : 0;
  }

  if (salePrice !== undefined) {
    updateData.salePrice = salePrice ? parseFloat(salePrice) : 0;
  }

  const checkCourse = await prisma.course.findUnique({
    where: { slug },
  });

  if (!checkCourse) {
    throw new ApiError(404, "Course not found");
  }

  const updatedCourse = await prisma.course.update({
    where: { slug },
    data: updateData,
  });

  return res
    .status(200)
    .json(new ApiResponsive(200, updatedCourse, "Course updated successfully"));
});

export const toggleCourseProperty = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const { property } = req.body;

  const validProperties = [
    "isPublished",
    "paid",
    "isFeatured",
    "isPopular",
    "isTrending",
    "isBestseller",
  ];

  if (!validProperties.includes(property)) {
    throw new ApiError(400, "Invalid property");
  }

  const course = await prisma.course.findUnique({
    where: { slug },
  });

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  const updatedCourse = await prisma.course.update({
    where: { slug },
    data: {
      [property]: !course[property],
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponsive(
        200,
        { [property]: updatedCourse[property] },
        `Course ${property} updated successfully`
      )
    );
});

export const getAllCourseForSEO = asyncHandler(async (req, res) => {
  const courses = await prisma.course.findMany({
    where: {
      isPublished: true,
    },
    select: {
      title: true,
      description: true,
      slug: true,
      thumbnail: true,
      metaTitle: true,
      metaDesc: true,
      createdAt: true,
      updatedAt: true,
      isPublished: true,
    },
  });

  return res
    .status(200)
    .json(new ApiResponsive(200, courses, "Courses retrieved successfully"));
});
