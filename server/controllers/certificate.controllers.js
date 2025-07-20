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

const generateCertificatePDF = (certificateData) => {
  try {
    // Validate certificate data
    if (!certificateData) {
      throw new Error("Certificate data is required");
    }

    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
      margin: 0,
    });

    // Set up colors
    const primaryColor = "#dc2626"; // Red
    const secondaryColor = "#b91c1c"; // Dark Red
    const accentColor = "#ef4444"; // Light Red
    const textColor = "#1f2937"; // Dark gray
    const lightTextColor = "#6b7280"; // Gray
    const goldColor = "#f59e0b"; // Gold accent

    // Page dimensions
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // Background - Simple white background instead of gradient
    doc.rect(0, 0, pageWidth, pageHeight).fill("#ffffff");

    // Main decorative border - Improved design
    const outerBorder = 15;
    const innerBorder = 25;

    // Outer border with solid color
    doc
      .rect(
        outerBorder,
        outerBorder,
        pageWidth - outerBorder * 2,
        pageHeight - outerBorder * 2
      )
      .lineWidth(3)
      .stroke(primaryColor);

    // Inner elegant border
    doc
      .rect(
        innerBorder,
        innerBorder,
        pageWidth - innerBorder * 2,
        pageHeight - innerBorder * 2
      )
      .lineWidth(1)
      .stroke(lightTextColor);

    // Corner decorations - More elegant
    const cornerSize = 30;
    const cornerThickness = 3;

    // Top-left corner
    doc
      .rect(innerBorder, innerBorder, cornerSize, cornerThickness)
      .fill(primaryColor);
    doc
      .rect(innerBorder, innerBorder, cornerThickness, cornerSize)
      .fill(primaryColor);

    // Top-right corner
    doc
      .rect(
        pageWidth - innerBorder - cornerSize,
        innerBorder,
        cornerSize,
        cornerThickness
      )
      .fill(primaryColor);
    doc
      .rect(
        pageWidth - innerBorder - cornerThickness,
        innerBorder,
        cornerThickness,
        cornerSize
      )
      .fill(primaryColor);

    // Bottom-left corner
    doc
      .rect(
        innerBorder,
        pageHeight - innerBorder - cornerThickness,
        cornerSize,
        cornerThickness
      )
      .fill(primaryColor);
    doc
      .rect(
        innerBorder,
        pageHeight - innerBorder - cornerSize,
        cornerThickness,
        cornerSize
      )
      .fill(primaryColor);

    // Bottom-right corner
    doc
      .rect(
        pageWidth - innerBorder - cornerSize,
        pageHeight - innerBorder - cornerThickness,
        cornerSize,
        cornerThickness
      )
      .fill(primaryColor);
    doc
      .rect(
        pageWidth - innerBorder - cornerThickness,
        pageHeight - innerBorder - cornerSize,
        cornerThickness,
        cornerSize
      )
      .fill(primaryColor);

    // Header section - Better spacing
    const headerStartY = innerBorder + 50;

    // Company logo/name - More prominent
    doc
      .fontSize(36)
      .font("Helvetica-Bold")
      .fillColor(primaryColor)
      .text("MonarkFX", pageWidth * 0.1, headerStartY, {
        width: pageWidth * 0.8,
        align: "center",
      });

    // Subtitle with better spacing
    doc
      .fontSize(14)
      .font("Helvetica-Oblique")
      .fillColor(lightTextColor)
      .text("Global Trading Excellence", pageWidth * 0.1, headerStartY + 45, {
        width: pageWidth * 0.8,
        align: "center",
      });

    // Decorative separator
    const separatorY = headerStartY + 80;
    const separatorWidth = pageWidth * 0.6;
    const separatorX = (pageWidth - separatorWidth) / 2;

    doc
      .moveTo(separatorX, separatorY)
      .lineTo(separatorX + separatorWidth, separatorY)
      .lineWidth(2)
      .strokeOpacity(0.8)
      .stroke(primaryColor);

    // Small decorative elements on separator
    doc.circle(separatorX, separatorY, 4).fill(goldColor);
    doc.circle(separatorX + separatorWidth, separatorY, 4).fill(goldColor);
    doc.circle(pageWidth / 2, separatorY, 6).fill(primaryColor);

    // Certificate title - More elegant positioning
    const titleY = separatorY + 40;
    doc
      .fontSize(42)
      .font("Helvetica-Bold")
      .fillColor(textColor)
      .text("Certificate of Achievement", pageWidth * 0.1, titleY, {
        width: pageWidth * 0.8,
        align: "center",
      });

    // Content section - Better organized
    const contentStartY = titleY + 80;

    // "This is to certify that" text
    doc
      .fontSize(18)
      .font("Helvetica")
      .fillColor(textColor)
      .text("This is to certify that", pageWidth * 0.1, contentStartY, {
        width: pageWidth * 0.8,
        align: "center",
      });

    // Student name - More prominent with background
    const nameY = contentStartY + 40;
    const nameBackgroundWidth = pageWidth * 0.7;
    const nameBackgroundX = (pageWidth - nameBackgroundWidth) / 2;

    // Subtle background for name
    doc
      .rect(nameBackgroundX, nameY - 10, nameBackgroundWidth, 60)
      .fillOpacity(0.05)
      .fill(primaryColor)
      .fillOpacity(1);

    doc
      .fontSize(38)
      .font("Helvetica-Bold")
      .fillColor(primaryColor)
      .text(
        certificateData.userName || "Student Name",
        pageWidth * 0.1,
        nameY,
        {
          width: pageWidth * 0.8,
          align: "center",
        }
      );

    // Course completion text
    const completionTextY = nameY + 70;
    doc
      .fontSize(18)
      .font("Helvetica")
      .fillColor(textColor)
      .text(
        "has successfully completed the course",
        pageWidth * 0.1,
        completionTextY,
        {
          width: pageWidth * 0.8,
          align: "center",
        }
      );

    // Course title - More prominent
    const courseTitleY = completionTextY + 40;
    doc
      .fontSize(28)
      .font("Helvetica-Bold")
      .fillColor(secondaryColor)
      .text(
        certificateData.courseTitle || "Course Title",
        pageWidth * 0.1,
        courseTitleY,
        {
          width: pageWidth * 0.8,
          align: "center",
        }
      );

    // Date and grade section - Better organized
    const detailsY = courseTitleY + 60;

    // Date
    const dateText = certificateData.completedDate
      ? `Awarded on ${new Date(
          certificateData.completedDate
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`
      : `Awarded on ${new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`;

    doc
      .fontSize(16)
      .font("Helvetica")
      .fillColor(textColor)
      .text(dateText, pageWidth * 0.1, detailsY, {
        width: pageWidth * 0.8,
        align: "center",
      });

    // Grade (if available)
    if (certificateData.grade) {
      doc
        .fontSize(18)
        .font("Helvetica-Bold")
        .fillColor(accentColor)
        .text(
          `Grade Achieved: ${certificateData.grade}`,
          pageWidth * 0.1,
          detailsY + 30,
          {
            width: pageWidth * 0.8,
            align: "center",
          }
        );
    }

    // Certificate ID - Better positioning
    const certIdY = detailsY + (certificateData.grade ? 65 : 35);
    doc
      .fontSize(12)
      .font("Helvetica")
      .fillColor(lightTextColor)
      .text(
        `Certificate ID: ${
          certificateData.certificateId || "CERT-" + Date.now()
        }`,
        pageWidth * 0.1,
        certIdY,
        {
          width: pageWidth * 0.8,
          align: "center",
        }
      );

    // Bottom section - Better organized
    const bottomSectionY = pageHeight - 100;

    // Verification line - More elegant
    const verificationLineWidth = pageWidth * 0.8;
    const verificationLineX = (pageWidth - verificationLineWidth) / 2;

    doc
      .moveTo(verificationLineX, bottomSectionY)
      .lineTo(verificationLineX + verificationLineWidth, bottomSectionY)
      .lineWidth(1)
      .strokeOpacity(0.6)
      .stroke(lightTextColor);

    // Verification URL
    const certId = certificateData.certificateId || "CERT-" + Date.now();
    doc
      .fontSize(11)
      .font("Helvetica")
      .fillColor(lightTextColor)
      .text(
        `Verify this certificate at: monarkfx.com/verify/${certId}`,
        pageWidth * 0.1,
        bottomSectionY + 15,
        {
          width: pageWidth * 0.8,
          align: "center",
        }
      );

    // Footer
    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor(lightTextColor)
      .text(
        "This certificate is digitally generated and verifiable online",
        pageWidth * 0.1,
        bottomSectionY + 35,
        {
          width: pageWidth * 0.8,
          align: "center",
        }
      );

    // Simple decorative elements
    // Top decorative pattern
    const topPatternY = headerStartY - 20;
    const patternSpacing = pageWidth * 0.12;
    const startX = pageWidth * 0.15;

    for (let i = 0; i < 7; i++) {
      const x = startX + i * patternSpacing;
      doc.circle(x, topPatternY, 3).fill(primaryColor);
    }

    // Bottom decorative pattern
    const bottomPatternY = bottomSectionY - 40;
    for (let i = 0; i < 7; i++) {
      const x = startX + i * patternSpacing;
      doc.circle(x, bottomPatternY, 3).fill(secondaryColor);
    }

    return doc;
  } catch (error) {
    console.error("Error in generateCertificatePDF:", error);
    throw new Error(`Failed to generate PDF certificate: ${error.message}`);
  }
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
  try {
    const { certificateId } = req.params;

    if (!certificateId) {
      throw new ApiError(400, "Certificate ID is required");
    }

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
    const doc = generateCertificatePDF(certificateData);

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=certificate-${certificateId}.pdf`
    );

    // Pipe the PDF directly to the response
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error("Error in downloadCertificate:", error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      `Failed to generate certificate PDF: ${error.message}`
    );
  }
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
          verifyUrl: `monarkfx.com/verify/${certificate.certificateId}`,
        },
      },
      "Certificate verified successfully"
    )
  );
});
