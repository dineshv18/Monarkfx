import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// Email transporter configuration
// Email transporter configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || process.env.SMPT_HOST || "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || process.env.SMPT_USER || process.env.EMAIL_USER,
        pass: process.env.SMTP_PASSWORD || process.env.EMAIL_PASS,
    },
});

// Create new inquiry
export const createInquiry = async (req, res) => {
    try {
        const { name, email, phone, city, course, batchTiming, message, source } = req.body;

        // Validate required fields
        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and phone are required",
            });
        }

        // Create inquiry in database
        const inquiry = await prisma.inquiry.create({
            data: {
                name,
                email,
                phone,
                city: city || null,
                course: course || null,
                batchTiming: batchTiming || null,
                message: message || null,
                source: source || "contact",
            },
        });

        // Send email notification to admin
        try {
            const mailOptions = {
                from: process.env.FROM_EMAIL || `"MonarkFX Inquiry" <${process.env.SMTP_USER || process.env.SMPT_USER}>`,
                to: "service@monarkfx.com",
                subject: `New ${source === "live-classes" ? "Online Classes" : "Contact"} Inquiry - ${name}`,
                html: `
          <h2>New Inquiry Received</h2>
          <p><strong>Source:</strong> ${source === "live-classes" ? "Online Classes Page" : "Contact Page"}</p>
          <hr/>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          ${city ? `<p><strong>City:</strong> ${city}</p>` : ""}
          ${course ? `<p><strong>Course Interested:</strong> ${course}</p>` : ""}
          ${batchTiming ? `<p><strong>Preferred Batch:</strong> ${batchTiming}</p>` : ""}
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
          <hr/>
          <p><small>Received at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</small></p>
        `,
            };

            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error("Error sending email notification:", emailError);
            // Don't fail the request if email fails
        }

        res.status(201).json({
            success: true,
            message: "Inquiry submitted successfully",
            data: inquiry,
        });
    } catch (error) {
        console.error("Error creating inquiry:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit inquiry",
        });
    }
};

// Get all inquiries (Admin)
export const getAllInquiries = async (req, res) => {
    try {
        const { page = 1, limit = 20, status, source, search } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const where = {};

        if (status) {
            where.status = status;
        }

        if (source) {
            where.source = source;
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { phone: { contains: search } },
            ];
        }

        const [inquiries, total] = await Promise.all([
            prisma.inquiry.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: parseInt(limit),
            }),
            prisma.inquiry.count({ where }),
        ]);

        res.json({
            success: true,
            data: inquiries,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / parseInt(limit)),
            },
        });
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch inquiries",
        });
    }
};

// Update inquiry status (Admin)
export const updateInquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["NEW", "CONTACTED", "ENROLLED"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        const inquiry = await prisma.inquiry.update({
            where: { id },
            data: { status },
        });

        res.json({
            success: true,
            message: "Status updated successfully",
            data: inquiry,
        });
    } catch (error) {
        console.error("Error updating inquiry status:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update status",
        });
    }
};

// Get inquiry stats (Admin)
export const getInquiryStats = async (req, res) => {
    try {
        const [total, newCount, contactedCount, enrolledCount, todayCount] = await Promise.all([
            prisma.inquiry.count(),
            prisma.inquiry.count({ where: { status: "NEW" } }),
            prisma.inquiry.count({ where: { status: "CONTACTED" } }),
            prisma.inquiry.count({ where: { status: "ENROLLED" } }),
            prisma.inquiry.count({
                where: {
                    createdAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    },
                },
            }),
        ]);

        // Course-wise breakdown
        const courseBreakdown = await prisma.inquiry.groupBy({
            by: ["course"],
            _count: true,
            where: {
                course: { not: null },
            },
        });

        res.json({
            success: true,
            data: {
                total,
                new: newCount,
                contacted: contactedCount,
                enrolled: enrolledCount,
                today: todayCount,
                byCourse: courseBreakdown,
            },
        });
    } catch (error) {
        console.error("Error fetching inquiry stats:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch stats",
        });
    }
};
