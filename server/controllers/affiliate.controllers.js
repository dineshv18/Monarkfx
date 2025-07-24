import { ApiError } from "../utils/ApiError.js";

import { generateReferralCode } from "../utils/generateReferralCode.js";
import { prisma } from "../config/db.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create new affiliate
const createAffiliate = asyncHandler(async (req, res) => {
  const {
    name,
    phone,
    address,
    city,
    state,
    country,
    pincode,
    bankName,
    accountNumber,
    ifscCode,
    accountHolderName,
    upiId,
    commissionRate,
    notes,
    govtIdNumber,
  } = req.body;

  const userId = req.user.id;
  const email = req.user.email;

  // Check if affiliate already exists for this user
  const existingAffiliate = await prisma.affiliate.findFirst({
    where: { userId },
  });
  if (existingAffiliate) {
    throw new ApiError(400, "You have already applied for affiliate.");
  }

  // Check if affiliate already exists with this email (should not happen, but for safety)
  const emailAffiliate = await prisma.affiliate.findFirst({
    where: { email },
  });
  if (emailAffiliate) {
    throw new ApiError(400, "Affiliate with this email already exists");
  }

  // Generate unique referral code
  const referralCode = await generateReferralCode();

  const affiliate = await prisma.affiliate.create({
    data: {
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      pincode,
      bankName,
      accountNumber,
      ifscCode,
      accountHolderName,
      upiId,
      commissionRate: commissionRate || 15.0,
      referralCode,
      notes,
      govtIdNumber,
      userId,
    },
  });

  return res
    .status(201)
    .json(new ApiResponsive(201, affiliate, "Affiliate created successfully"));
});

// Get all affiliates with pagination and filters
const getAllAffiliates = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    search,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Build where clause
  const where = {};
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
      { referralCode: { contains: search, mode: "insensitive" } },
    ];
  }

  // Get affiliates with sales count and total earnings
  const affiliates = await prisma.affiliate.findMany({
    where,
    skip,
    take: parseInt(limit),
    orderBy: { [sortBy]: sortOrder },
    include: {
      _count: {
        select: { sales: true },
      },
    },
  });

  // Get total count for pagination
  const total = await prisma.affiliate.count({ where });

  return res.status(200).json(
    new ApiResponsive(200, {
      affiliates,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    })
  );
});

// Get affiliate by ID
const getAffiliateById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const affiliate = await prisma.affiliate.findUnique({
    where: { id },
    include: {
      sales: {
        orderBy: { createdAt: "desc" },
        take: 10, // Last 10 sales
      },
      _count: {
        select: { sales: true },
      },
    },
  });

  if (!affiliate) {
    throw new ApiError(404, "Affiliate not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponsive(
        200,
        affiliate,
        "Affiliate details retrieved successfully"
      )
    );
});

// Update affiliate
const updateAffiliate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    phone,
    address,
    city,
    state,
    country,
    pincode,
    bankName,
    accountNumber,
    ifscCode,
    accountHolderName,
    upiId,
    commissionRate,
    status,
    notes,
    adminNotes,
    isActive,
  } = req.body;

  // Check if affiliate exists
  const existingAffiliate = await prisma.affiliate.findUnique({
    where: { id },
  });

  if (!existingAffiliate) {
    throw new ApiError(404, "Affiliate not found");
  }

  // Check if email is being changed and if it's already taken
  if (email && email !== existingAffiliate.email) {
    const emailExists = await prisma.affiliate.findUnique({
      where: { email },
    });
    if (emailExists) {
      throw new ApiError(400, "Email already exists");
    }
  }

  const updatedAffiliate = await prisma.affiliate.update({
    where: { id },
    data: {
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      pincode,
      bankName,
      accountNumber,
      ifscCode,
      accountHolderName,
      upiId,
      commissionRate,
      status,
      notes,
      adminNotes,
      isActive,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponsive(200, updatedAffiliate, "Affiliate updated successfully")
    );
});

// Delete affiliate
const deleteAffiliate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const affiliate = await prisma.affiliate.findUnique({
    where: { id },
  });

  if (!affiliate) {
    throw new ApiError(404, "Affiliate not found");
  }

  await prisma.affiliate.delete({
    where: { id },
  });

  return res
    .status(200)
    .json(new ApiResponsive(200, {}, "Affiliate deleted successfully"));
});

// Create affiliate sale
const createAffiliateSale = asyncHandler(async (req, res) => {
  const {
    affiliateId,
    courseId,
    courseName,
    saleAmount,
    customerName,
    customerEmail,
    customerPhone,
    paymentMethod,
    transactionId,
    notes,
  } = req.body;

  // Check if affiliate exists
  const affiliate = await prisma.affiliate.findUnique({
    where: { id: affiliateId },
  });

  if (!affiliate) {
    throw new ApiError(404, "Affiliate not found");
  }

  // Calculate commission
  const commissionAmount = (saleAmount * affiliate.commissionRate) / 100;

  const sale = await prisma.affiliateSale.create({
    data: {
      affiliateId,
      courseId,
      courseName,
      saleAmount,
      commissionAmount,
      customerName,
      customerEmail,
      customerPhone,
      paymentMethod,
      transactionId,
      notes,
    },
  });

  // Update affiliate's total earnings and sales count
  await prisma.affiliate.update({
    where: { id: affiliateId },
    data: {
      totalEarnings: {
        increment: commissionAmount,
      },
      totalSales: {
        increment: 1,
      },
    },
  });

  return res
    .status(201)
    .json(new ApiResponsive(201, sale, "Affiliate sale created successfully"));
});

// Get all affiliate sales
const getAllAffiliateSales = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    affiliateId,
    status,
    startDate,
    endDate,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Build where clause
  const where = {};
  if (affiliateId) where.affiliateId = affiliateId;
  if (status) where.status = status;
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt.gte = new Date(startDate);
    if (endDate) where.createdAt.lte = new Date(endDate);
  }

  const sales = await prisma.affiliateSale.findMany({
    where,
    skip,
    take: parseInt(limit),
    orderBy: { [sortBy]: sortOrder },
    include: {
      affiliate: {
        select: {
          id: true,
          name: true,
          email: true,
          referralCode: true,
        },
      },
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  const total = await prisma.affiliateSale.count({ where });

  return res.status(200).json(
    new ApiResponsive(200, {
      sales,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    })
  );
});

// Update affiliate sale status
const updateAffiliateSaleStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const sale = await prisma.affiliateSale.findUnique({
    where: { id },
    include: { affiliate: true },
  });

  if (!sale) {
    throw new ApiError(404, "Sale not found");
  }

  const updatedSale = await prisma.affiliateSale.update({
    where: { id },
    data: { status, notes },
  });

  return res
    .status(200)
    .json(
      new ApiResponsive(200, updatedSale, "Sale status updated successfully")
    );
});

// Get affiliate statistics
const getAffiliateStats = asyncHandler(async (req, res) => {
  const totalAffiliates = await prisma.affiliate.count();
  const activeAffiliates = await prisma.affiliate.count({
    where: { isActive: true },
  });
  const pendingAffiliates = await prisma.affiliate.count({
    where: { status: "PENDING" },
  });
  const approvedAffiliates = await prisma.affiliate.count({
    where: { status: "APPROVED" },
  });

  const totalSales = await prisma.affiliateSale.count();
  const completedSales = await prisma.affiliateSale.count({
    where: { status: "COMPLETED" },
  });
  const totalEarnings = await prisma.affiliateSale.aggregate({
    where: { status: "COMPLETED" },
    _sum: { commissionAmount: true },
  });

  const monthlyStats = await prisma.affiliateSale.groupBy({
    by: ["status"],
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
    _count: { id: true },
    _sum: { commissionAmount: true },
  });

  return res.status(200).json(
    new ApiResponsive(200, {
      totalAffiliates,
      activeAffiliates,
      pendingAffiliates,
      approvedAffiliates,
      totalSales,
      completedSales,
      totalEarnings: totalEarnings._sum.commissionAmount || 0,
      monthlyStats,
    })
  );
});

// Get affiliate by referral code
const getAffiliateByReferralCode = asyncHandler(async (req, res) => {
  const { referralCode } = req.params;

  const affiliate = await prisma.affiliate.findUnique({
    where: { referralCode },
    select: {
      id: true,
      name: true,
      email: true,
      referralCode: true,
      commissionRate: true,
      status: true,
      isActive: true,
    },
  });

  if (!affiliate) {
    throw new ApiError(404, "Affiliate not found");
  }

  if (!affiliate.isActive || affiliate.status !== "APPROVED") {
    throw new ApiError(400, "Affiliate is not active");
  }

  return res
    .status(200)
    .json(new ApiResponsive(200, affiliate, "Affiliate found"));
});

// Get logged-in user's affiliate dashboard
const getMyAffiliateDashboard = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const affiliate = await prisma.affiliate.findFirst({
    where: { userId },
    include: {
      sales: {
        include: {
          course: { select: { id: true, title: true, slug: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!affiliate) {
    throw new ApiError(404, "Affiliate profile not found");
  }
  const totalEarnings = affiliate.sales.reduce(
    (sum, sale) => sum + (sale.commissionAmount || 0),
    0
  );
  return res.status(200).json(
    new ApiResponsive(
      200,
      {
        affiliate: {
          id: affiliate.id,
          name: affiliate.name,
          referralCode: affiliate.referralCode,
          status: affiliate.status,
          isActive: affiliate.isActive,
          totalEarnings,
          sales: affiliate.sales.map((sale) => ({
            id: sale.id,
            course: sale.course,
            saleAmount: sale.saleAmount,
            commissionAmount: sale.commissionAmount,
            createdAt: sale.createdAt,
            status: sale.status,
          })),
        },
      },
      "Affiliate dashboard info"
    )
  );
});

export {
  createAffiliate,
  getAllAffiliates,
  getAffiliateById,
  updateAffiliate,
  deleteAffiliate,
  createAffiliateSale,
  getAllAffiliateSales,
  updateAffiliateSaleStatus,
  getAffiliateStats,
  getAffiliateByReferralCode,
  getMyAffiliateDashboard,
};
