import { prisma } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";
import PDFDocument from "pdfkit";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";
import { format } from "date-fns";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure temp directory exists
const tempDir = path.join(__dirname, "../temp");
fs.mkdir(tempDir, { recursive: true }).catch(console.error);

const generateCertificatePDF = async (certificateData) => {
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
    margin: 40,
  });

  // Set up colors
  const primaryColor = "#22c55e"; // Green
  const secondaryColor = "#10b981"; // Emerald
  const accentColor = "#fbbf24"; // Amber
  const textColor = "#1f2937"; // Dark gray
  const lightTextColor = "#6b7280"; // Gray

  // Background gradient effect
  const gradient = doc.linearGradient(0, 0, doc.page.width, doc.page.height);
  gradient.stop(0, "#ffffff");
  gradient.stop(0.3, "#f8fafc");
  gradient.stop(0.7, "#f1f5f9");
  gradient.stop(1, "#e2e8f0");

  doc.rect(0, 0, doc.page.width, doc.page.height).fill(gradient);

  // Decorative border
  const borderWidth = 15;
  const borderGradient = doc.linearGradient(
    0,
    0,
    doc.page.width,
    doc.page.height
  );
  borderGradient.stop(0, primaryColor);
  borderGradient.stop(0.5, secondaryColor);
  borderGradient.stop(1, accentColor);

  doc
    .rect(
      borderWidth,
      borderWidth,
      doc.page.width - borderWidth * 2,
      doc.page.height - borderWidth * 2
    )
    .lineWidth(3)
    .stroke(borderGradient);

  // Inner decorative border
  const innerBorderWidth = 25;
  doc
    .rect(
      innerBorderWidth,
      innerBorderWidth,
      doc.page.width - innerBorderWidth * 2,
      doc.page.height - innerBorderWidth * 2
    )
    .lineWidth(1)
    .stroke(lightTextColor);

  // Corner decorations
  const cornerSize = 40;
  const cornerColor = primaryColor;

  // Top-left corner
  doc.rect(innerBorderWidth, innerBorderWidth, cornerSize, 3).fill(cornerColor);
  doc.rect(innerBorderWidth, innerBorderWidth, 3, cornerSize).fill(cornerColor);

  // Top-right corner
  doc
    .rect(
      doc.page.width - innerBorderWidth - cornerSize,
      innerBorderWidth,
      cornerSize,
      3
    )
    .fill(cornerColor);
  doc
    .rect(
      doc.page.width - innerBorderWidth - 3,
      innerBorderWidth,
      3,
      cornerSize
    )
    .fill(cornerColor);

  // Bottom-left corner
  doc
    .rect(
      innerBorderWidth,
      doc.page.height - innerBorderWidth - 3,
      cornerSize,
      3
    )
    .fill(cornerColor);
  doc
    .rect(
      innerBorderWidth,
      doc.page.height - innerBorderWidth - cornerSize,
      3,
      cornerSize
    )
    .fill(cornerColor);

  // Bottom-right corner
  doc
    .rect(
      doc.page.width - innerBorderWidth - cornerSize,
      doc.page.height - innerBorderWidth - 3,
      cornerSize,
      3
    )
    .fill(cornerColor);
  doc
    .rect(
      doc.page.width - innerBorderWidth - 3,
      doc.page.height - innerBorderWidth - cornerSize,
      3,
      cornerSize
    )
    .fill(cornerColor);

  // Header section
  const headerY = innerBorderWidth + 60;

  // Company logo/name
  doc
    .fontSize(28)
    .font("Helvetica-Bold")
    .fillColor(primaryColor)
    .text("MonarkFX", {
      align: "center",
      y: headerY,
    });

  // Subtitle
  doc
    .fontSize(14)
    .font("Helvetica")
    .fillColor(lightTextColor)
    .text("Global Trading Excellence", {
      align: "center",
      y: headerY + 35,
    });

  // Decorative line
  const lineY = headerY + 60;
  doc
    .moveTo(doc.page.width * 0.2, lineY)
    .lineTo(doc.page.width * 0.8, lineY)
    .lineWidth(2)
    .stroke(primaryColor);

  // Certificate title
  doc
    .fontSize(36)
    .font("Helvetica-Bold")
    .fillColor(textColor)
    .text("Certificate of Achievement", {
      align: "center",
      y: lineY + 40,
    });

  // Achievement icon (text-based)
  doc
    .fontSize(48)
    .font("Helvetica-Bold")
    .fillColor(accentColor)
    .text("🏆", {
      align: "center",
      y: lineY + 90,
    });

  // Certificate content
  const contentY = lineY + 160;

  doc
    .fontSize(18)
    .font("Helvetica")
    .fillColor(textColor)
    .text("This is to certify that", {
      align: "center",
      y: contentY,
    });

  // Student name
  doc
    .fontSize(32)
    .font("Helvetica-Bold")
    .fillColor(primaryColor)
    .text(certificateData.userName, {
      align: "center",
      y: contentY + 40,
    });

  // Course completion text
  doc
    .fontSize(18)
    .font("Helvetica")
    .fillColor(textColor)
    .text("has successfully completed the course", {
      align: "center",
      y: contentY + 90,
    });

  // Course title
  doc
    .fontSize(24)
    .font("Helvetica-Bold")
    .fillColor(secondaryColor)
    .text(certificateData.courseTitle, {
      align: "center",
      y: contentY + 130,
    });

  // Date and grade section
  const detailsY = contentY + 180;

  doc
    .fontSize(16)
    .font("Helvetica")
    .fillColor(textColor)
    .text(
      `Awarded on ${format(
        new Date(certificateData.completedDate),
        "MMMM dd, yyyy"
      )}`,
      {
        align: "center",
        y: detailsY,
      }
    );

  if (certificateData.grade) {
    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .fillColor(accentColor)
      .text(`Grade Achieved: ${certificateData.grade}`, {
        align: "center",
        y: detailsY + 30,
      });
  }

  // Certificate ID
  doc
    .fontSize(12)
    .font("Helvetica")
    .fillColor(lightTextColor)
    .text(`Certificate ID: ${certificateData.certificateId}`, {
      align: "center",
      y: detailsY + 60,
    });

  // Bottom section with verification
  const bottomY = doc.page.height - 120;

  // Verification line
  doc
    .moveTo(doc.page.width * 0.1, bottomY)
    .lineTo(doc.page.width * 0.9, bottomY)
    .lineWidth(1)
    .stroke(lightTextColor);

  // Verification text
  doc
    .fontSize(10)
    .font("Helvetica")
    .fillColor(lightTextColor)
    .text(
      `Verify this certificate at: ${process.env.FRONTEND_URL}/verify/${certificateData.certificateId}`,
      {
        align: "center",
        y: bottomY + 20,
      }
    );

  // Footer
  doc
    .fontSize(10)
    .font("Helvetica")
    .fillColor(lightTextColor)
    .text("This certificate is digitally generated and verifiable online", {
      align: "center",
      y: bottomY + 40,
    });

  // Add some decorative elements
  // Top decorative pattern
  const patternY = headerY - 20;
  for (let i = 0; i < 5; i++) {
    const x = doc.page.width * 0.1 + i * doc.page.width * 0.2;
    doc.circle(x, patternY, 3).fill(primaryColor);
  }

  // Bottom decorative pattern
  const bottomPatternY = bottomY - 40;
  for (let i = 0; i < 5; i++) {
    const x = doc.page.width * 0.1 + i * doc.page.width * 0.2;
    doc.circle(x, bottomPatternY, 3).fill(secondaryColor);
  }

  return doc;
};

export const getUserCertificates = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const certificates = await prisma.courseCompletion.findMany({
    where: {
      userId,
    },
    include: {
      course: {
        select: {
          title: true,
          description: true,
        },
      },
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponsive(
        200,
        certificates,
        "Certificates retrieved successfully"
      )
    );
});

export const downloadCertificate = asyncHandler(async (req, res) => {
  const { certificateId } = req.params;

  const certificate = await prisma.courseCompletion.findUnique({
    where: {
      certificateId,
    },
    include: {
      user: true,
      course: true,
    },
  });

  if (!certificate) {
    throw new ApiError(404, "Certificate not found");
  }

  // Create certificate data object
  const certificateData = {
    userName: certificate.user.name,
    courseTitle: certificate.course.title,
    completedDate: certificate.completedAt,
    certificateId: certificate.certificateId,
    grade: certificate.grade,
  };

  // Generate PDF using the improved template
  const doc = await generateCertificatePDF(certificateData);

  // Set response headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=certificate-${certificateId}.pdf`
  );

  // Pipe the PDF directly to the response
  doc.pipe(res);
  doc.end();
});

export const shareCertificate = asyncHandler(async (req, res) => {
  const { certificateId } = req.params;
  const userId = req.user.id;

  const certificate = await prisma.courseCompletion.findUnique({
    where: { certificateId },
    include: {
      user: true,
      course: true,
    },
  });

  if (!certificate) {
    throw new ApiError(404, "Certificate not found");
  }

  if (certificate.userId !== userId && req.user.role !== "ADMIN") {
    throw new ApiError(403, "Not authorized to share this certificate");
  }

  const shareUrl = `${process.env.FRONTEND_URL}/verify/${certificateId}`;

  return res
    .status(200)
    .json(
      new ApiResponsive(200, { shareUrl }, "Share URL generated successfully")
    );
});

export const getAllCertificates = asyncHandler(async (req, res) => {
  const certificates = await prisma.courseCompletion.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      course: {
        select: {
          title: true,
        },
      },
    },
    orderBy: { completedAt: "desc" },
  });

  return res
    .status(200)
    .json(
      new ApiResponsive(
        200,
        certificates,
        "All certificates fetched successfully"
      )
    );
});

export const generateCertificate = asyncHandler(async (req, res) => {
  const { userId, courseId, grade } = req.body;

  // Check if certificate already exists
  const existingCertificate = await prisma.courseCompletion.findFirst({
    where: { userId, courseId },
  });

  if (existingCertificate) {
    throw new ApiError(
      400,
      "Certificate already exists for this user and course"
    );
  }

  const certificate = await prisma.courseCompletion.create({
    data: {
      userId,
      courseId,
      grade,
      certificateId: nanoid(10),
    },
    include: {
      user: true,
      course: true,
    },
  });

  return res
    .status(201)
    .json(
      new ApiResponsive(201, certificate, "Certificate generated successfully")
    );
});

export const updateCertificate = asyncHandler(async (req, res) => {
  const { certificateId } = req.params;
  const { grade } = req.body;

  const certificate = await prisma.courseCompletion.update({
    where: { certificateId },
    data: { grade },
    include: {
      user: true,
      course: true,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponsive(200, certificate, "Certificate updated successfully")
    );
});

export const deleteCertificate = asyncHandler(async (req, res) => {
  const { certificateId } = req.params;

  await prisma.courseCompletion.delete({
    where: { certificateId },
  });

  return res
    .status(200)
    .json(new ApiResponsive(200, null, "Certificate deleted successfully"));
});

export const verifyCertificate = asyncHandler(async (req, res) => {
  const { certificateId } = req.params;

  const certificate = await prisma.courseCompletion.findUnique({
    where: { certificateId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      course: {
        select: {
          title: true,
          description: true,
        },
      },
    },
  });

  if (!certificate) {
    throw new ApiError(404, "Certificate not found or invalid");
  }

  // Return verification data
  return res.status(200).json(
    new ApiResponsive(
      200,
      {
        isValid: true,
        certificateData: {
          studentName: certificate.user.name,
          courseName: certificate.course.title,
          issueDate: format(new Date(certificate.completedAt), "MMMM dd, yyyy"),
          grade: certificate.grade,
          certificateId: certificate.certificateId,
        },
      },
      "Certificate verified successfully"
    )
  );
});
