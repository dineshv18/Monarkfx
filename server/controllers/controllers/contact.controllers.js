import { prisma } from "../../config/db.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponsive } from "../../utils/ApiResponsive.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


export const createContact = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
        throw new ApiError(400, "Please provide all required fields");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Please provide a valid email address");
    }

    // Create contact entry
    await prisma.contact.create({
        data: {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            message: message.trim(),
        },
    });

    return res.status(201).json(
        new ApiResponsive(
            201,
            "Message sent successfully! We'll get back to you soon.",

        )
    );
});


export const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await prisma.contact.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return res.status(200).json(
        new ApiResponsive(
            200,
            contacts,
            "Contact messages retrieved successfully"
        )
    );
});

// Get single contact message (Admin only)
export const getContactById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
        where: { id }
    });

    if (!contact) {
        throw new ApiError(404, "Contact message not found");
    }

    return res.status(200).json(
        new ApiResponsive(
            200,
            contact,
            "Contact message retrieved successfully"
        )
    );
});

// Delete contact message (Admin only)
export const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
        where: { id }
    });

    if (!contact) {
        throw new ApiError(404, "Contact message not found");
    }

    await prisma.contact.delete({
        where: { id }
    });

    return res.status(200).json(
        new ApiResponsive(
            200,
            null,
            "Contact message deleted successfully"
        )
    );
});