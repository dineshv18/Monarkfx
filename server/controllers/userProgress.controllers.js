import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const markChapterComplete = asyncHandler(async (req, res) => {
  const { chapterId } = req.body;
  const userId = req.user.id;

  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
  });

  if (!chapter) {
    throw new ApiError(404, "Chapter not found");
  }

  const userProgress = await prisma.userProgress.upsert({
    where: {
      userId_chapterId: {
        userId,
        chapterId,
      },
    },
    update: {
      isCompleted: true,
    },
    create: {
      userId,
      chapterId,
      isCompleted: true,
    },
  });

  return res
    .status(200)
    .json(new ApiResponsive(200, "Chapter marked as complete", userProgress));
});

export const getProgress = asyncHandler(async (req, res) => {
  const { chapterId } = req.params;
  const userId = req.user.id;

  const userProgress = await prisma.userProgress.findUnique({
    where: {
      userId_chapterId: {
        userId,
        chapterId,
      },
    },
  });

  return res
    .status(200)
    .json(new ApiResponsive(200, "User progress retrieved", userProgress));
});

export const getCourseProgress = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  const courseProgress = await prisma.userProgress.findMany({
    where: {
      userId,
      chapter: {
        courseId: courseId,
      },
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponsive(200, "User course progress retrieved", courseProgress)
    );
});
