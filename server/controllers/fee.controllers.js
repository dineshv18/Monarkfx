import { razorpay } from "../app.js";
import { prisma } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import { generatePDF } from "../utils/generatePDF.js";
import { SendEmail } from "../email/SendEmail.js";

export const getAllStudents = asyncHandler(async (req, res) => {
    try {
        const students = await prisma.user.findMany({
            where: {
                role: "STUDENT"
            },
            select: {
                id: true,
                name: true,
                email: true,
                usertype: true,
                isOffline: true
            },
            orderBy: {
                name: 'asc'
            }
        });

        return res.status(200).json(
            new ApiResponsive(200, students, "Students fetched successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Failed to fetch students");
    }
});

// Modified createFee controller
export const createFee = asyncHandler(async (req, res) => {
    try {
        const {
            userId,
            amount,
            dueDate,
            type,
            description,
            title,
            lateFeeDate,
            lateFeeAmount,
            isOfflineFee
        } = req.body;

        // Validation
        if (!userId) {
            throw new ApiError(400, "Student selection is required");
        }

        if (!amount || !dueDate || !type || !title) {
            throw new ApiError(400, "Required fee details missing");
        }

        // Check if student exists
        const student = await prisma.user.findFirst({
            where: {
                id: userId,
                role: "STUDENT"
            }
        });

        if (!student) {
            throw new ApiError(404, "Student not found");
        }

        const fee = await prisma.fee.create({
            data: {
                amount: parseFloat(amount),
                dueDate: new Date(dueDate),
                type,
                description,
                title,
                lateFeeDate: lateFeeDate ? new Date(lateFeeDate) : null,
                lateFeeAmount: lateFeeAmount ? parseFloat(lateFeeAmount) : null,
                isOfflineFee: isOfflineFee || false,
                userId,
            },
        });

        // Send email notification
        await SendEmail({
            email: student.email,
            subject: "New Fee Assignment",
            message: {
                title: fee.title,
                amount: fee.amount,
                dueDate: fee.dueDate,
                description: fee.description || "No description provided"
            },
            emailType: "FEE_NOTIFICATION"
        });

        return res.status(201).json(
            new ApiResponsive(201, fee, "Fee created successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message || "Failed to create fee");
    }
});

// Modified payFee function
export const payFee = asyncHandler(async (req, res) => {
    const { feeId, amount } = req.body;

    if (!feeId || !amount) {
        throw new ApiError(400, "Fee ID and amount are required");
    }

    try {
        // Check Razorpay configuration
        if (!razorpay) {
            console.error("Razorpay instance missing");
            throw new ApiError(500, "Payment service unavailable");
        }

        // Validate fee exists and get user details
        const fee = await prisma.fee.findUnique({
            where: { id: feeId },
            include: {
                user: true,
                payments: true
            }
        });

        if (!fee) {
            throw new ApiError(404, "Fee not found");
        }

        // Calculate total amount with late fee
        let totalAmount = parseFloat(amount);
        let lateFeeApplied = 0;

        if (fee.lateFeeDate && new Date() > new Date(fee.lateFeeDate) && fee.lateFeeAmount) {
            lateFeeApplied = fee.lateFeeAmount;
            totalAmount += lateFeeApplied;
        }

        // Create shorter receipt ID (max 40 chars)
        const shortFeeId = feeId.split('-')[0]; // Take first part of UUID
        const timestamp = Date.now().toString().slice(-8); // Last 8 digits of timestamp
        const receipt = `fee_${shortFeeId}_${timestamp}`;

        // Create Razorpay order
        const orderOptions = {
            amount: Math.round(totalAmount * 100), // Convert to paise
            currency: "INR",
            receipt: receipt, // Shortened receipt ID
            notes: {
                feeId: feeId,
                userId: req.user.id
            }
        };

        console.log("Creating order with options:", orderOptions);

        // Create order with promise handling
        const order = await new Promise((resolve, reject) => {
            razorpay.orders.create(orderOptions, (err, order) => {
                if (err) {
                    console.error("Razorpay Create Order Error:", err);
                    reject(new ApiError(
                        err.statusCode || 500,
                        err.error?.description || "Failed to create payment order"
                    ));
                } else {
                    resolve(order);
                }
            });
        });

        console.log("Order created:", order);

        if (!order || !order.id) {
            throw new ApiError(500, "Failed to create payment order");
        }

        // Send response with order details
        return res.status(200).json(
            new ApiResponsive(200, {
                order_id: order.id,
                amount: order.amount,
                currency: "INR",
                user: {
                    name: fee.user.name,
                    email: fee.user.email
                },
                fee: {
                    id: fee.id,
                    title: fee.title,
                    description: fee.description || `Fee payment for ${fee.title}`
                }
            }, "Payment initiated successfully")
        );

    } catch (error) {
        console.error("Payment Error:", {
            name: error.name,
            message: error.message,
            stack: error.stack,
            details: error
        });

        // Pass through the original error message if it exists
        throw new ApiError(
            error.statusCode || 500,
            error.message || "Failed to initiate payment"
        );
    }
});

// Update fee
export const updateFee = asyncHandler(async (req, res) => {
    try {
        const { feeId } = req.params;
        const updateData = req.body; // Only contains fields that need to be updated

        const existingFee = await prisma.fee.findUnique({
            where: { id: feeId },
            include: {
                payments: true,
                user: true
            }
        });

        if (!existingFee) {
            throw new ApiError(404, "Fee not found");
        }

        // Don't allow updates if fee is already paid
        if (existingFee.status === "PAID") {
            throw new ApiError(400, "Cannot update a paid fee");
        }

        // Don't allow amount update if payments exist
        if (updateData.amount !== undefined && existingFee.payments.length > 0) {
            throw new ApiError(400, "Cannot update amount after payments have been made");
        }

        // Parse numeric values
        if (updateData.amount) updateData.amount = parseFloat(updateData.amount);
        if (updateData.lateFeeAmount) updateData.lateFeeAmount = parseFloat(updateData.lateFeeAmount);
        
        // Parse dates
        if (updateData.dueDate) updateData.dueDate = new Date(updateData.dueDate);
        if (updateData.lateFeeDate) updateData.lateFeeDate = new Date(updateData.lateFeeDate);

        const updatedFee = await prisma.fee.update({
            where: { id: feeId },
            data: updateData,
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                payments: true
            }
        });

        // Send email notification for fee update
        await SendEmail({
            email: existingFee.user.email,
            subject: "Fee Details Updated",
            message: {
                title: "Fee Update Notification",
                feeTitle: updatedFee.title,
                changes: Object.keys(updateData).join(", "),
                newDueDate: updateData.dueDate ? updateData.dueDate.toLocaleDateString() : undefined,
                newAmount: updateData.amount
            },
            emailType: "FEE_UPDATE"
        });

        return res.status(200).json(
            new ApiResponsive(200, updatedFee, "Fee updated successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message || "Failed to update fee");
    }
});
// Delete fee
export const deleteFee = asyncHandler(async (req, res) => {
    try {
        const { feeId } = req.params;

        const existingFee = await prisma.fee.findUnique({
            where: { id: feeId },
            include: { payments: true }
        });

        if (!existingFee) {
            throw new ApiError(404, "Fee not found");
        }

        if (existingFee.payments.length > 0) {
            throw new ApiError(400, "Cannot delete fee with existing payments");
        }

        await prisma.fee.delete({
            where: { id: feeId }
        });

        return res.status(200).json(
            new ApiResponsive(200, null, "Fee deleted successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message || "Failed to delete fee");
    }
});

// Add verifyFeePayment function
export const verifyFeePayment = asyncHandler(async (req, res) => {
    const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        feeId,
        amount
    } = req.body;

    try {
        // Verify signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            throw new ApiError(400, "Invalid payment signature");
        }

        // Generate a unique receipt number
        const timestamp = Date.now().toString();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const receiptNumber = `RCPT-${timestamp.slice(-6)}${randomStr}`.toUpperCase();

        // Create payment record
        const payment = await prisma.feePayment.create({
            data: {
                amount: parseFloat(amount),
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                status: "COMPLETED",
                feeId,
                userId: req.user.id,
                receiptNumber,
                actualDueAmount: parseFloat(amount) // Add this required field
            },
            include: {
                fee: true,
                user: true
            }
        });

        // Update fee status
        const fee = await prisma.fee.findUnique({
            where: { id: feeId },
            include: { payments: true }
        });

        const totalPaid = fee.payments.reduce((sum, p) => 
            sum + (p.status === "COMPLETED" ? p.amount : 0), 0
        );

        await prisma.fee.update({
            where: { id: feeId },
            data: {
                status: totalPaid >= fee.amount ? "PAID" : "PARTIAL"
            }
        });

        // Send payment confirmation email
        await SendEmail({
            email: req.user.email,
            subject: "Payment Confirmation",
            message: {
                title: "Payment Successful",
                amount: amount,
                feeTitle: fee.title,
                paymentId: razorpay_payment_id,
                receiptNumber: receiptNumber,
                date: new Date().toLocaleDateString()
            },
            emailType: "PAYMENT_CONFIRMATION"
        });

        return res.status(200).json(
            new ApiResponsive(200, payment, "Payment verified successfully")
        );

    } catch (error) {
        console.error("Payment verification error:", error);
        throw new ApiError(
            error.statusCode || 500,
            error.message || "Payment verification failed"
        );
    }
});

// Get fee details for a user
export const getFeeDetails = asyncHandler(async (req, res) => {
    try {
        const fees = await prisma.fee.findMany({
            where: { 
                userId: req.user.id,
            },
            include: {
                payments: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: { dueDate: 'desc' }
        });

        const feeSummary = fees.map(fee => {
            const totalPaid = fee.payments.reduce((sum, payment) => 
                sum + (payment.status === "COMPLETED" ? payment.amount : 0), 0
            );
            const remaining = fee.amount - totalPaid;
            
            // Calculate status based on payment and due date
            let status = "PENDING";
            if (totalPaid >= fee.amount) {
                status = "PAID";
            } else if (new Date() > new Date(fee.dueDate)) {
                status = "OVERDUE";
            }

            return {
                ...fee,
                totalPaid,
                remaining,
                status
            };
        });

        return res.status(200).json(
            new ApiResponsive(200, feeSummary, "Fee details fetched successfully")
        );
    } catch (error) {
        console.error("Fee details error:", error);
        throw new ApiError(500, "Failed to fetch fee details");
    }
});

// Get all fees (Admin)
export const getAllFees = asyncHandler(async (req, res) => {
    try {
        const { status, type, fromDate, toDate } = req.query;

        const where = {
            ...(status && { status }),
            ...(type && { type }),
            ...(fromDate && toDate && {
                dueDate: {
                    gte: new Date(fromDate),
                    lte: new Date(toDate)
                }
            })
        };

        const fees = await prisma.fee.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                payments: true
            },
            orderBy: { dueDate: 'desc' }
        });

        const feesWithSummary = fees.map(fee => ({
            ...fee,
            totalPaid: fee.payments.reduce((sum, payment) =>
                sum + (payment.status === "COMPLETED" ? payment.amount : 0), 0
            ),
            remaining: fee.amount - fee.payments.reduce((sum, payment) =>
                sum + (payment.status === "COMPLETED" ? payment.amount : 0), 0
            )
        }));

        return res.status(200).json(
            new ApiResponsive(200, feesWithSummary, "All fees fetched successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Failed to fetch fees");
    }
});

// Get fee payment history
export const getFeeHistory = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;

        const payments = await prisma.feePayment.findMany({
            where: {
                userId: userId || req.user.id
            },
            include: {
                fee: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return res.status(200).json(
            new ApiResponsive(200, payments, "Payment history fetched successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Failed to fetch payment history");
    }
});

// Generate fee receipt
export const generateFeeReceipt = asyncHandler(async (req, res) => {
    try {
        const { paymentId } = req.params;

        const payment = await prisma.feePayment.findUnique({
            where: { id: paymentId },
            include: {
                user: true,
                fee: true
            }
        });

        if (!payment) {
            throw new ApiError(404, "Payment not found");
        }

        const receiptPDF = await generatePDF({
            ...payment,
            paymentDate: payment.createdAt,
            userName: payment.user.name,
            feeType: payment.fee.type
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=receipt-${payment.receiptNumber}.pdf`);

        return res.send(receiptPDF);
    } catch (error) {
        throw new ApiError(500, "Failed to generate receipt");
    }
});

// Add this new controller for fee analytics
export const getFeeAnalytics = asyncHandler(async (req, res) => {
    try {
        // Get query parameters for filtering
        const { startDate, endDate, type } = req.query;

        // Base query conditions
        let whereConditions = {};
        
        // Add date range filter if provided
        if (startDate && endDate) {
            whereConditions.dueDate = {
                gte: new Date(startDate),
                lte: new Date(endDate)
            };
        }

        // Add type filter if provided
        if (type) {
            whereConditions.type = type;
        }

        // Get all fees with payments
        const fees = await prisma.fee.findMany({
            where: whereConditions,
            include: {
                payments: {
                    where: {
                        status: "COMPLETED"
                    }
                },
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        // Calculate analytics
        const analytics = {
            totalFees: fees.length,
            totalAmount: 0,
            collectedAmount: 0,
            pendingAmount: 0,
            monthlyCollection: {},
            typeWiseCollection: {},
            paymentStatus: {
                PAID: 0,
                PARTIAL: 0,
                PENDING: 0,
                OVERDUE: 0
            },
            recentPayments: [],
            studentWiseData: {}
        };

        // Process each fee
        fees.forEach(fee => {
            const totalPaid = fee.payments.reduce((sum, payment) => sum + payment.amount, 0);
            const remaining = fee.amount - totalPaid;
            const month = new Date(fee.dueDate).toLocaleString('default', { month: 'long', year: 'numeric' });
            
            // Update total amounts
            analytics.totalAmount += fee.amount;
            analytics.collectedAmount += totalPaid;
            analytics.pendingAmount += remaining;

            // Update monthly collection
            analytics.monthlyCollection[month] = (analytics.monthlyCollection[month] || 0) + totalPaid;

            // Update type-wise collection
            analytics.typeWiseCollection[fee.type] = analytics.typeWiseCollection[fee.type] || {
                total: 0,
                collected: 0,
                pending: 0
            };
            analytics.typeWiseCollection[fee.type].total += fee.amount;
            analytics.typeWiseCollection[fee.type].collected += totalPaid;
            analytics.typeWiseCollection[fee.type].pending += remaining;

            // Update payment status
            let status = "PENDING";
            if (totalPaid >= fee.amount) {
                status = "PAID";
            } else if (totalPaid > 0) {
                status = "PARTIAL";
            } else if (new Date() > new Date(fee.dueDate)) {
                status = "OVERDUE";
            }
            analytics.paymentStatus[status]++;

            // Update student-wise data
            if (!analytics.studentWiseData[fee.userId]) {
                analytics.studentWiseData[fee.userId] = {
                    name: fee.user.name,
                    email: fee.user.email,
                    totalFees: 0,
                    paidAmount: 0,
                    pendingAmount: 0
                };
            }
            analytics.studentWiseData[fee.userId].totalFees++;
            analytics.studentWiseData[fee.userId].paidAmount += totalPaid;
            analytics.studentWiseData[fee.userId].pendingAmount += remaining;
        });

        // Get recent payments
        analytics.recentPayments = await prisma.feePayment.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                fee: {
                    select: {
                        title: true,
                        type: true
                    }
                }
            }
        });

        // Calculate percentages
        analytics.collectionRate = (analytics.collectedAmount / analytics.totalAmount) * 100;
        analytics.overdueRate = (analytics.paymentStatus.OVERDUE / analytics.totalFees) * 100;

        return res.status(200).json(
            new ApiResponsive(200, analytics, "Fee analytics fetched successfully")
        );

    } catch (error) {
        console.error("Fee analytics error:", error);
        throw new ApiError(500, "Failed to fetch fee analytics");
    }
});